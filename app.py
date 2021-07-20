from models import Earthquakes
from models import Tornados
from flask import Flask, render_template, redirect
from flask_sqlalchemy import SQLAlchemy
from config import pg_password

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = f"postgresql://postgres:{pg_password}@localhost:5432/disaster_db"
db = SQLAlchemy(app)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/map")
def map():
    earthquakes = Earthquakes.query.all()
    tornados = Tornados.query.all()
    quake_results = [
        {
            "lat": quake.lat,
            "lon": quake.lon,
            "mag": quake.mag,
            "date": quake.date,
            "year":quake.year
        } for quake in earthquakes]

    tornado_results = [
        {
            "year": tornado.year,
            "date": tornado.date,
            "mag": tornado.mag,
            "lat": tornado.lat,
            "lon": tornado.lon
        } for tornado in tornados]

    return quake_results, tornado_results


if __name__ == "__main__":
    app.run(debug=True)