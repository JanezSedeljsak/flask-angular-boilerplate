from sqlalchemy import create_engine, Column, Integer, String, MetaData, Table, DateTime
from datetime import datetime

try:
    from .config import DB_URI
except:
    from config import DB_URI

metadata = MetaData()

notes = Table('notes', metadata,
    Column('Id', Integer, primary_key=True),
    Column('Title', String(120)),
    Column('Description', String(120)),
    Column('DateCreated', DateTime, default=datetime.utcnow)
)

engine = create_engine(DB_URI)
metadata.create_all(engine)
