import models
from flask import Flask, render_template, jsonify
from flask_sqlalchemy import SQLAlchemy
import os
from config import password

app = Flask(__name__, template_folder='templates')
app.config['SQLALCHEMY_DATABASE_URI'] = f"postgresql://postgres:{password}@localhost:5432/disaster_db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/map")
def map():
    e_results = db.session.query(models.Earthquakes.lat, models.Earthquakes.lon, models.Earthquakes.mag, models.Earthquakes.year, models.Earthquakes.date).all()
    t_results = db.session.query(models.Tornados.lat, models.Tornados.lon, models.Tornados.mag, models.Tornados.year, models.Tornados.date).all()
    
    e_lat = [result[0] for result in e_results]
    e_lon = [result[1] for result in e_results]
    e_mag = [result[2] for result in e_results]
    e_year = [result[3] for result in e_results]
    e_date = [result[4] for result in e_results]
    
    earthquake_data = [
        {
            "lat": e_lat,
            "lon": e_lon,
            "mag": e_mag,
            "date": e_date,
            "year": e_year
        }]

    t_lat = [result[0] for result in t_results]
    t_lon = [result[1] for result in t_results]
    t_mag = [result[2] for result in t_results]
    t_year = [result[3] for result in t_results]
    t_date = [result[4] for result in t_results]

    tornado_data = [
        {
            "year": t_year,
            "date": t_date,
            "mag": t_mag,
            "lat": t_lat,
            "lon": t_lon
        }]
    print(earthquake_data)
    return jsonify(earthquake_data, tornado_data)


if __name__ == "__main__":
    app.run(debug=True)