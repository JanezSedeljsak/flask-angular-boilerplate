from sqlalchemy import create_engine, Column, Integer, String, MetaData, Table, DateTime
from datetime import datetime
import MySQLdb as mySQL

try:
    from .config import DB_URI, DB_CONFIG
except:
    from config import DB_URI, DB_CONFIG

metadata = MetaData()

# example of a DB Table
notes = Table('notes', metadata,
    Column('Id', Integer, primary_key=True),
    Column('Title', String(120)),
    Column('Description', String(120)),
    Column('DateCreated', DateTime, default=datetime.utcnow)
)

# methods which should be called on the init of the database
if __name__ == "__main__":
    db = mySQL.connect(host=DB_CONFIG["URL"],user=DB_CONFIG["USERNAME"],passwd=DB_CONFIG["PASSWORD"])
    db1 = db.cursor()
    db1.execute("CREATE DATABASE IF NOT EXISTS %s" % DB_CONFIG["DB_NAME"])
    engine = create_engine(DB_URI)
        
    metadata.create_all(engine)