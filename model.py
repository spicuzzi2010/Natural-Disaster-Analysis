from app import db
from sqlalchemy.dialects.postgresql import JSON

class Earthquakes(db.Model):
    __tablename__ = 'earthquakes'

    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime())
    lat = db.Column(db.Float())
    lon = db.Column(db.Float())
    mag = db.Column(db.Float())
    result_all = db.Column(JSON)

    def __init__(self, date, lat, lon, mag, result_all):
        self.date = date
        self.lat = lat
        self.lon = lon
        self.mag = mag
        self.result_all = result_all

    def __repr__(self):
        return '<id {}>'.format(self.id)