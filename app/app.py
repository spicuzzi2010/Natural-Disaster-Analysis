from flask import Flask, render_template, jsonify
from flask_sqlalchemy import SQLAlchemy
import os
#from config import password
import models

app = Flask(__name__, template_folder='templates')
#app.config['SQLALCHEMY_DATABASE_URI'] = f"postgresql://postgres:{password}@localhost:5432/natural_disasters"
app.config['SQLALCHEMY_DATABASE_URI'] = (os.environ.get('DATABASE_URL').replace('postgres://', 'postgresql://', 1))
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)



@app.route("/")
def home():
    return render_template("index.html")


@app.route("/api/disasters")
def disaster():
    results = db.session.query(models.Disaster.id,
                                    models.Disaster.county,
                                    models.Disaster.state, 
                                    models.Disaster.lat, 
                                    models.Disaster.lon, 
                                    models.Disaster.year, 
                                    models.Disaster.date,
                                    models.Disaster.disastertype,
                                    models.Disaster.declarationtitle).all()
    
    id = [result[0] for result in results]
    county = [result[1] for result in results]
    state = [result[2] for result in results]
    lat = [result[3] for result in results]
    lon = [result[4] for result in results]
    year = [result[5] for result in results]
    date = [result[6] for result in results]
    type = [result[7] for result in results]
    title = [result[8] for result in results]
    
    data = [
        {
            "id":id[x],
            "county":county[x],
            "state":state[x],
            "lat":lat[x],
            "lon":lon[x],
            "year":year[x],
            "date":date[x],
            "type":type[x],
            "title":title[x]         
        } for x in range(len(id))]

    return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True)