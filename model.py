from app import db
from sqlalchemy.dialects.postgresql import JSON

class Earthquakes(db.Model):
    __tablename__ = 'earthquakes'

    id = db.Column(db.Integer, primary_key=True)
    lat = db.Column(db.Float())
    lon = db.Column(db.Float())
    mag = db.Column(db.Float())
    date = db.Column(db.DateTime())
    year = db.Column(db.Integer())
    result_all = db.Column(JSON)

    def __init__(self, lat, lon, mag, date, year, result_all):
        
        self.lat = lat
        self.lon = lon
        self.mag = mag
        self.date = date
        self.year = year
        self.result_all = result_all

    def __repr__(self):
        return '<id {}>'.format(self.id)

class Tornados(db.Model):
    __tablename__ = 'earthquakes'

    id = db.Column(db.Integer, primary_key=True)
    year = db.Column(db.Integer())
    date = db.Column(db.DateTime())
    mag = db.Column(db.Integer())
    lat = db.Column(db.Float())
    lon = db.Column(db.Float())
    result_all = db.Column(JSON)

    def __init__(self, lat, lon, mag, date, year, result_all):
        
        self.lat = lat
        self.lon = lon
        self.mag = mag
        self.date = date
        self.year = year
        self.result_all = result_all

    def __repr__(self):
        return '<id {}>'.format(self.id)