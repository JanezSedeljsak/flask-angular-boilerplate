# used for select queries
def sqlExe(query, conn=None, multiple=True):
    if not conn:
        from sqlalchemy import create_engine
        from .config import DB_URI
        conn = create_engine(DB_URI)

    result = list(map(lambda x: dict(x.items()), conn.execute(query)))
    return result if multiple else result[0]

# used for [delete, insert, update]
def sqlAction(query, conn=None):
    if not conn:
        from sqlalchemy import create_engine
        from .config import DB_URI
        conn = create_engine(DB_URI)

    result = conn.execute(query)
    return result
