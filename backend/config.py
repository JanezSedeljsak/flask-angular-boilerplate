# I suggest putting this into env variables for security reasons
DB_URI = 'mysql://root:@localhost/example'

# configuration object for Flask application
class Config(object):
    DEBUG = True