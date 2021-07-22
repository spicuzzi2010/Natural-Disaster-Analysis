def create_earthquakes(db):
    class Earthquakes(db.Model):
        __tablename__ = 'earthquake'

        index = db.Column(db.Integer, primary_key=True)
        lat = db.Column(db.Float())
        lon = db.Column(db.Float())
        mag = db.Column(db.Float())
        date = db.Column(db.Date())
        year = db.Column(db.Integer())

        # def __init__(self, lat, lon, mag, date, year, result_all):
            
        #     self.lat = lat
        #     self.lon = lon
        #     self.mag = mag
        #     self.date = date
        #     self.year = year
        #     self.result_all = result_all

        def __repr__(self):
            return '<id {}>'.format(self.id)

def create_tornados(db):
    class Tornados(db.Model):
        __tablename__ = 'tornado'

        index = db.Column(db.Integer, primary_key=True)
        lat = db.Column(db.Float())
        lon = db.Column(db.Float())
        mag = db.Column(db.Integer())
        date = db.Column(db.Date())
        year = db.Column(db.Integer())

        # def __init__(self, lat, lon, mag, date, year, result_all):
            
        #     self.lat = lat
        #     self.lon = lon
        #     self.mag = mag
        #     self.date = date
        #     self.year = year
        #     self.result_all = result_all

        def __repr__(self):
            return '<id {}>'.format(self.id)