from model import Earthquakes
from flask import Flask, render_template, redirect
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://postgres:postgres@localhost:5432/disasters"
db = SQLAlchemy(app)

@app.route("/")
def home():
    return render_template("index.html" map=map_data)

@app.route("/map")
def map():
    earthquakes = Earthquakes.query.all()
    results = [
        {
           "year":quake.year,
           "date": quake.date,
            "lat": quake.lat,
            "lon": quake.lon,
            "lon": quake.mag
        } for quake in earthquakes]

    return {"count": len(results), "cars": results}


if __name__ == "__main__":
    app.run(debug=True)