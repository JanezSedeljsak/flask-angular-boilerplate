# I suggest putting this into env variables for security reasons
DB_CONFIG = {
    "USERNAME": "root",
    "PASSWORD": "",
    "URL": "localhost",
    "DB_NAME": "cars"
}

DB_URI = 'mysql://%s:%s@%s/%s' % (DB_CONFIG["USERNAME"], DB_CONFIG["PASSWORD"], DB_CONFIG["URL"], DB_CONFIG["DB_NAME"])

# configuration object for Flask application
class Config(object):
    DEBUG = True