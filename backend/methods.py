def sqlExe(query, conn=None):
    if not conn:
        from sqlalchemy import create_engine
        from .config import DB_URI
        conn = create_engine(DB_URI)

    return list(map(lambda x: dict(x.items()), conn.execute(query)))