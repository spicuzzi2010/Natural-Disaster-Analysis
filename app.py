from flask import Flask, render_template, redirect
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://postgres:postgres@localhost:5432/disasters"
db = SQLAlchemy(app)
migrate = Migrate(app, db)

@app.route("/")
def home():
    mars_data = mongo.db.collection.find_one()
    return render_template("index.html", mars=mars_data)

@app.route("/map")

@app.route("/scrape")
def scrape():
    mars_info = scrape_mars.scrape()
    mongo.db.collection.update({},mars_info,upsert=True)
    return redirect("/")

if __name__ == "__main__":
    app.run(debug=True)