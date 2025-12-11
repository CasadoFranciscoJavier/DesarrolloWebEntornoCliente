from fastapi import FastAPI, HTTPException, Request, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Any, Dict, List, Optional
from uuid import uuid4
from threading import Lock

# ============================================================
# Configuración de la app
# ============================================================
app = FastAPI(title="API Música")

# ===== CORS: permitir cualquier origen (solo recomendado para desarrollo) =====
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],       # <- cualquier origen
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ===== Límites =====
MAX_OBJECTS_PER_COLLECTION = 2000
MAX_OBJECT_SIZE_BYTES = 10_000

# Estructuras de datos en memoria
# AUTORES: {
#   autor_id: {
#       "nombre": ...,
#       "pais": ...,
#       "periodo": ...,
#       "foto_url": ...
#   }
# }
# OBRAS:   {
#   obra_id: {
#       "titulo": ...,
#       "tipo": ...,
#       "anio": ...,
#       "autor_id": ...
#   }
# }
AUTORES: Dict[str, Dict[str, Any]] = {}
OBRAS: Dict[str, Dict[str, Any]] = {}
STORE_LOCK = Lock()


# ============================================================
# Modelos Pydantic
# ============================================================
class ObraBase(BaseModel):
    titulo: str = Field(..., description="Título de la obra")
    tipo: Optional[str] = Field(
        None, description="Tipo de obra (misa, motete, cantata, etc.)"
    )
    anio: Optional[int] = Field(
        None, description="Año aproximado de composición"
    )


class ObraCreate(ObraBase):
    autor_id: str = Field(..., description="ID del autor de la obra")


class ObraUpdate(BaseModel):
    titulo: Optional[str] = None
    tipo: Optional[str] = None
    anio: Optional[int] = None
    autor_id: Optional[str] = None


class Obra(ObraBase):
    id: str
    autor_id: str


class AutorBase(BaseModel):
    nombre: str = Field(..., description="Nombre completo del compositor")
    pais: Optional[str] = None
    periodo: Optional[str] = Field(
        None, description="Periodo histórico (Renacimiento, Barroco, etc.)"
    )
    foto_url: Optional[str] = Field(
        None, description="URL de la foto o avatar del compositor"
    )


class AutorCreate(AutorBase):
    pass


class AutorUpdate(BaseModel):
    nombre: Optional[str] = None
    pais: Optional[str] = None
    periodo: Optional[str] = None
    foto_url: Optional[str] = None


class Autor(AutorBase):
    id: str
    obras: List[Obra] = Field(default_factory=list)


# ============================================================
# Middleware para limitar tamaño del body
# ============================================================
@app.middleware("http")
async def limit_request_size(request: Request, call_next):
    # Solo aplicamos el límite a los endpoints de la API
    if request.url.path.startswith("/api/"):
        body = await request.body()
        if len(body) > MAX_OBJECT_SIZE_BYTES:
            # 413 Payload Too Large
            raise HTTPException(
                status_code=413,
                detail=f"Objeto demasiado grande (máximo {MAX_OBJECT_SIZE_BYTES} bytes)",
            )

    response = await call_next(request)
    return response


# ============================================================
# Helpers
# ============================================================
def ensure_space_for(collection_name: str):
    """Comprueba el límite de objetos por colección."""
    if collection_name == "autores" and len(AUTORES) >= MAX_OBJECTS_PER_COLLECTION:
        raise HTTPException(
            status_code=400,
            detail=f"Límite de {MAX_OBJECTS_PER_COLLECTION} autores alcanzado",
        )
    if collection_name == "obras" and len(OBRAS) >= MAX_OBJECTS_PER_COLLECTION:
        raise HTTPException(
            status_code=400,
            detail=f"Límite de {MAX_OBJECTS_PER_COLLECTION} obras alcanzado",
        )


def get_autor_or_404(autor_id: str) -> Dict[str, Any]:
    if autor_id not in AUTORES:
        raise HTTPException(status_code=404, detail="Autor no encontrado")
    return AUTORES[autor_id]


def get_obra_or_404(obra_id: str) -> Dict[str, Any]:
    if obra_id not in OBRAS:
        raise HTTPException(status_code=404, detail="Obra no encontrada")
    return OBRAS[obra_id]


def obras_de_autor(autor_id: str) -> List[Obra]:
    """Devuelve las obras de un autor concreto como modelos Obra."""
    obras: List[Obra] = []
    for oid, data in OBRAS.items():
        if data["autor_id"] == autor_id:
            obras.append(Obra(id=oid, **data))
    return obras


# ============================================================
# Semilla de datos: 50 obras de música sacra
# ============================================================
def seed_data():
    autores_data = [
        # 1) Palestrina – 5 obras
        {
            "nombre": "Giovanni Pierluigi da Palestrina",
            "pais": "Italia",
            "periodo": "Renacimiento",
            "foto_url": "https://ui-avatars.com/api/?name=Giovanni+P.+da+Palestrina&background=random&size=256",
            "obras": [
                {"titulo": "Missa Papae Marcelli", "tipo": "Misa", "anio": 1562},
                {"titulo": "Sicut cervus", "tipo": "Motete", "anio": 1584},
                {"titulo": "Stabat Mater", "tipo": "Motete", "anio": 1590},
                {"titulo": "Missa Brevis", "tipo": "Misa", "anio": 1570},
                {"titulo": "Super flumina Babylonis", "tipo": "Motete", "anio": 1581},
            ],
        },
        # 2) J. S. Bach – 5 obras
        {
            "nombre": "Johann Sebastian Bach",
            "pais": "Alemania",
            "periodo": "Barroco",
            "foto_url": "https://ui-avatars.com/api/?name=Johann+Sebastian+Bach&background=random&size=256",
            "obras": [
                {
                    "titulo": "Misa en si menor, BWV 232",
                    "tipo": "Misa",
                    "anio": 1749,
                },
                {
                    "titulo": "Pasión según San Mateo, BWV 244",
                    "tipo": "Pasión",
                    "anio": 1727,
                },
                {
                    "titulo": "Pasión según San Juan, BWV 245",
                    "tipo": "Pasión",
                    "anio": 1724,
                },
                {"titulo": "Magnificat, BWV 243", "tipo": "Magnificat", "anio": 1733},
                {
                    "titulo": "Jesu, meine Freude, BWV 227",
                    "tipo": "Motete",
                    "anio": 1723,
                },
            ],
        },
        # 3) Tomás Luis de Victoria – 6 obras
        {
            "nombre": "Tomás Luis de Victoria",
            "pais": "España",
            "periodo": "Renacimiento",
            "foto_url": "https://ui-avatars.com/api/?name=Tomas+Luis+de+Victoria&background=random&size=256",
            "obras": [
                {"titulo": "Missa O magnum mysterium", "tipo": "Misa", "anio": 1592},
                {"titulo": "O magnum mysterium", "tipo": "Motete", "anio": 1572},
                {
                    "titulo": "Officium defunctorum",
                    "tipo": "Oficio de difuntos",
                    "anio": 1605,
                },
                {"titulo": "Ave Maria", "tipo": "Motete", "anio": 1572},
                {
                    "titulo": "Tenebrae Responsories",
                    "tipo": "Responsorios",
                    "anio": 1585,
                },
                {"titulo": "Missa Pro Victoria", "tipo": "Misa", "anio": 1600},
            ],
        },
        # 4) William Byrd – 5 obras
        {
            "nombre": "William Byrd",
            "pais": "Inglaterra",
            "periodo": "Renacimiento tardío",
            "foto_url": "https://ui-avatars.com/api/?name=William+Byrd&background=random&size=256",
            "obras": [
                {"titulo": "Mass for Four Voices", "tipo": "Misa", "anio": 1592},
                {"titulo": "Mass for Five Voices", "tipo": "Misa", "anio": 1593},
                {"titulo": "Ave verum corpus", "tipo": "Motete", "anio": 1605},
                {"titulo": "Sing joyfully", "tipo": "Anthem", "anio": 1590},
                {"titulo": "Mass for Three Voices", "tipo": "Misa", "anio": 1592},
            ],
        },
        # 5) Thomas Tallis – 3 obras
        {
            "nombre": "Thomas Tallis",
            "pais": "Inglaterra",
            "periodo": "Renacimiento",
            "foto_url": "https://ui-avatars.com/api/?name=Thomas+Tallis&background=random&size=256",
            "obras": [
                {"titulo": "Spem in alium", "tipo": "Motete", "anio": 1570},
                {"titulo": "If ye love me", "tipo": "Anthem", "anio": 1549},
                {
                    "titulo": "Lamentations of Jeremiah",
                    "tipo": "Lamentaciones",
                    "anio": 1565,
                },
            ],
        },
        # 6) Orlando di Lasso – 4 obras
        {
            "nombre": "Orlando di Lasso",
            "pais": "Flandes",
            "periodo": "Renacimiento",
            "foto_url": "https://ui-avatars.com/api/?name=Orlando+di+Lasso&background=random&size=256",
            "obras": [
                {
                    "titulo": "Lagrime di San Pietro",
                    "tipo": "Madrigal espiritual",
                    "anio": 1594,
                },
                {
                    "titulo": "Missa super Osculetur me",
                    "tipo": "Misa",
                    "anio": 1570,
                },
                {
                    "titulo": "Tristis est anima mea",
                    "tipo": "Motete",
                    "anio": 1582,
                },
                {"titulo": "Domine Jesu Christe", "tipo": "Motete", "anio": 1575},
            ],
        },
        # 7) Claudio Monteverdi – 4 obras
        {
            "nombre": "Claudio Monteverdi",
            "pais": "Italia",
            "periodo": "Barroco temprano",
            "foto_url": "https://ui-avatars.com/api/?name=Claudio+Monteverdi&background=random&size=256",
            "obras": [
                {
                    "titulo": "Vespro della Beata Vergine",
                    "tipo": "Vísperas",
                    "anio": 1610,
                },
                {
                    "titulo": "Selva morale e spirituale",
                    "tipo": "Colección sacra",
                    "anio": 1641,
                },
                {
                    "titulo": "Messa a quattro voci da cappella",
                    "tipo": "Misa",
                    "anio": 1641,
                },
                {"titulo": "Beatus Vir", "tipo": "Salmo", "anio": 1630},
            ],
        },
        # 8) George Frideric Handel – 4 obras
        {
            "nombre": "George Frideric Handel",
            "pais": "Alemania / Inglaterra",
            "periodo": "Barroco",
            "foto_url": "https://ui-avatars.com/api/?name=George+Frideric+Handel&background=random&size=256",
            "obras": [
                {"titulo": "Messiah, HWV 56", "tipo": "Oratorio", "anio": 1741},
                {"titulo": "Dixit Dominus, HWV 232", "tipo": "Salmo", "anio": 1707},
                {"titulo": "Israel in Egypt, HWV 54", "tipo": "Oratorio", "anio": 1739},
                {
                    "titulo": "Chandos Anthem No. 9",
                    "tipo": "Anthem",
                    "anio": 1717,
                },
            ],
        },
        # 9) Antonio Vivaldi – 3 obras
        {
            "nombre": "Antonio Vivaldi",
            "pais": "Italia",
            "periodo": "Barroco",
            "foto_url": "https://ui-avatars.com/api/?name=Antonio+Vivaldi&background=random&size=256",
            "obras": [
                {
                    "titulo": "Gloria en re mayor, RV 589",
                    "tipo": "Gloria",
                    "anio": 1715,
                },
                {"titulo": "Magnificat, RV 610", "tipo": "Magnificat", "anio": 1719},
                {"titulo": "Stabat Mater, RV 621", "tipo": "Stabat Mater", "anio": 1712},
            ],
        },
        # 10) Wolfgang Amadeus Mozart – 5 obras
        {
            "nombre": "Wolfgang Amadeus Mozart",
            "pais": "Austria",
            "periodo": "Clasicismo",
            "foto_url": "https://ui-avatars.com/api/?name=Wolfgang+Amadeus+Mozart&background=random&size=256",
            "obras": [
                {
                    "titulo": "Requiem en re menor, KV 626",
                    "tipo": "Requiem",
                    "anio": 1791,
                },
                {
                    "titulo": "Misa en co menor, KV 427",
                    "tipo": "Misa",
                    "anio": 1783,
                },
                {
                    "titulo": "Misa de la Coronación, KV 317",
                    "tipo": "Misa",
                    "anio": 1779,
                },
                {
                    "titulo": "Vesperae solennes de confessore, KV 339",
                    "tipo": "Vísperas",
                    "anio": 1780,
                },
                {"titulo": "Ave verum corpus, KV 618", "tipo": "Motete", "anio": 1791},
            ],
        },
        # 11) Joseph Haydn – 3 obras
        {
            "nombre": "Joseph Haydn",
            "pais": "Austria",
            "periodo": "Clasicismo",
            "foto_url": "https://ui-avatars.com/api/?name=Joseph+Haydn&background=random&size=256",
            "obras": [
                {
                    "titulo": "Missa in angustiis (Nelsonmesse)",
                    "tipo": "Misa",
                    "anio": 1798,
                },
                {"titulo": "Die Schöpfung", "tipo": "Oratorio", "anio": 1798},
                {"titulo": "Harmoniemesse", "tipo": "Misa", "anio": 1802},
            ],
        },
        # 12) Anton Bruckner – 3 obras
        {
            "nombre": "Anton Bruckner",
            "pais": "Austria",
            "periodo": "Romanticismo",
            "foto_url": "https://ui-avatars.com/api/?name=Anton+Bruckner&background=random&size=256",
            "obras": [
                {
                    "titulo": "Misa n.º 2 en mi menor",
                    "tipo": "Misa",
                    "anio": 1869,
                },
                {"titulo": "Te Deum", "tipo": "Himno", "anio": 1884},
                {"titulo": "Locus iste", "tipo": "Motete", "anio": 1869},
            ],
        },
    ]

    with STORE_LOCK:
        for autor in autores_data:
            autor_id = str(uuid4())
            AUTORES[autor_id] = {
                "nombre": autor["nombre"],
                "pais": autor["pais"],
                "periodo": autor["periodo"],
                "foto_url": autor.get("foto_url"),
            }
            for obra in autor["obras"]:
                obra_id = str(uuid4())
                OBRAS[obra_id] = {
                    "titulo": obra["titulo"],
                    "tipo": obra.get("tipo"),
                    "anio": obra.get("anio"),
                    "autor_id": autor_id,
                }


# Sembramos datos al arrancar el módulo
seed_data()


# ============================================================
# Root
# ============================================================
@app.get("/")
def root():
    return {
        "message": "API de Música Sacra (en memoria)",
        "hint": "Usa /api/autores y /api/obras para gestionar datos.",
        "entities": {
            "autor": {
                "campos": ["id", "nombre", "pais", "periodo", "foto_url", "obras[]"],
            },
            "obra": {
                "campos": ["id", "titulo", "tipo", "anio", "autor_id"],
            },
        },
        "stats": {
            "autores_precargados": len(AUTORES),
            "obras_precargadas": len(OBRAS),
        },
        "limits": {
            "max_objects_per_collection": MAX_OBJECTS_PER_COLLECTION,
            "max_object_size_bytes": MAX_OBJECT_SIZE_BYTES,
        },
    }


# ============================================================
# Endpoints de AUTORES
# ============================================================
@app.post("/api/autores", response_model=Autor, status_code=201)
def create_autor(payload: AutorCreate):
    with STORE_LOCK:
        ensure_space_for("autores")
        autor_id = str(uuid4())
        AUTORES[autor_id] = payload.dict()

    return Autor(id=autor_id, obras=[], **payload.dict())


@app.get("/api/autores", response_model=List[Autor])
def list_autores():
    autores: List[Autor] = []
    for aid, data in AUTORES.items():
        autores.append(Autor(id=aid, obras=obras_de_autor(aid), **data))
    return autores


@app.get("/api/autores/{autor_id}", response_model=Autor)
def get_autor(autor_id: str):
    data = get_autor_or_404(autor_id)
    return Autor(id=autor_id, obras=obras_de_autor(autor_id), **data)


@app.put("/api/autores/{autor_id}", response_model=Autor)
def replace_autor(autor_id: str, payload: AutorCreate):
    _ = get_autor_or_404(autor_id)
    with STORE_LOCK:
        AUTORES[autor_id] = payload.dict()

    return Autor(id=autor_id, obras=obras_de_autor(autor_id), **payload.dict())


@app.patch("/api/autores/{autor_id}", response_model=Autor)
def update_autor(autor_id: str, payload: AutorUpdate):
    data = get_autor_or_404(autor_id)
    update_data = payload.dict(exclude_unset=True)

    with STORE_LOCK:
        data.update(update_data)
        AUTORES[autor_id] = data

    return Autor(id=autor_id, obras=obras_de_autor(autor_id), **data)


@app.delete("/api/autores/{autor_id}", status_code=204)
def delete_autor(autor_id: str):
    _ = get_autor_or_404(autor_id)

    with STORE_LOCK:
        obras_a_borrar = [oid for oid, o in OBRAS.items() if o["autor_id"] == autor_id]
        for oid in obras_a_borrar:
            del OBRAS[oid]
        del AUTORES[autor_id]


@app.get("/api/autores/{autor_id}/obras", response_model=List[Obra])
def list_obras_de_autor(autor_id: str):
    _ = get_autor_or_404(autor_id)
    return obras_de_autor(autor_id)


# ============================================================
# Endpoints de OBRAS
# ============================================================
@app.post("/api/obras", response_model=Obra, status_code=201)
def create_obra(payload: ObraCreate):
    _ = get_autor_or_404(payload.autor_id)

    with STORE_LOCK:
        ensure_space_for("obras")
        obra_id = str(uuid4())
        OBRAS[obra_id] = payload.dict()

    return Obra(id=obra_id, **payload.dict())


@app.get("/api/obras", response_model=List[Obra])
def list_obras(autor_id: Optional[str] = Query(None, description="Filtrar por autor_id")):
    obras: List[Obra] = []

    for oid, data in OBRAS.items():
        if autor_id is not None and data["autor_id"] != autor_id:
            continue
        obras.append(Obra(id=oid, **data))

    return obras


@app.get("/api/obras/{obra_id}", response_model=Obra)
def get_obra(obra_id: str):
    data = get_obra_or_404(obra_id)
    return Obra(id=obra_id, **data)


@app.put("/api/obras/{obra_id}", response_model=Obra)
def replace_obra(obra_id: str, payload: ObraCreate):
    _ = get_obra_or_404(obra_id)
    _ = get_autor_or_404(payload.autor_id)

    with STORE_LOCK:
        OBRAS[obra_id] = payload.dict()

    return Obra(id=obra_id, **payload.dict())


@app.patch("/api/obras/{obra_id}", response_model=Obra)
def update_obra(obra_id: str, payload: ObraUpdate):
    data = get_obra_or_404(obra_id)
    update_data = payload.dict(exclude_unset=True)

    if "autor_id" in update_data:
        _ = get_autor_or_404(update_data["autor_id"])

    with STORE_LOCK:
        data.update(update_data)
        OBRAS[obra_id] = data

    return Obra(id=obra_id, **data)


@app.delete("/api/obras/{obra_id}", status_code=204)
def delete_obra(obra_id: str):
    _ = get_obra_or_404(obra_id)
    with STORE_LOCK:
        del OBRAS[obra_id]