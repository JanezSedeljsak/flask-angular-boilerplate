from sqlalchemy import create_engine, Column, Integer, String, MetaData, Table, DateTime
from datetime import datetime

try:
    from .config import DB_URI
except:
    from config import DB_URI

metadata = MetaData()

# example of a DB Table
notes = Table('notes', metadata,
    Column('Id', Integer, primary_key=True),
    Column('Title', String(120)),
    Column('Description', String(120)),
    Column('DateCreated', DateTime, default=datetime.utcnow)
)

# methods which should be called on the init of the database
engine = create_engine(DB_URI)
metadata.create_all(engine)
