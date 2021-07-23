from app import db

class Disaster(db.Model):
    __tablename__ = 'disaster'

    id = db.Column(db.Integer, primary_key=True)
    county = db.Column(db.String())
    state = db.Column(db.String())
    lat = db.Column(db.Float())
    lon = db.Column(db.Float())
    year = db.Column(db.Integer())
    date = db.Column(db.Date())
    disastertype = db.Column(db.String())
    declarationtitle = db.Column(db.String())

    def __repr__(self):
        return '<id {}>'.format(self.id)