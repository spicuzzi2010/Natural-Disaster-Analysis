import os
#from config import password
import pandas as pd
from sqlalchemy import create_engine

# Use one or the other:
SOURCE_PATH = 'app/static/data/disasterDataCleaned.csv'
# SOURCE_PATH = 'sqlite:///etl/pets.sqlite'

TABLE_NAME = 'disaster'
INDEX_COLUMN = 'id'
SOURCE_SQL = f"SELECT * FROM {TABLE_NAME};"

# (https://help.heroku.com/ZKNTJQSK/
# why-is-sqlalchemy-1-4-x-not-connecting-to-heroku-postgres)
#TARGET_DATABASE_URL = f"postgresql://postgres:{password}@localhost:5432/natural_disasters"
TARGET_DATABASE_URL = (
    os.environ.get('postgres://ywjxxscuyxrcas:003c648a175bead70287d791141cbf17bac01700754741e00139ca5077763b48@ec2-52-6-211-59.compute-1.amazonaws.com:5432/d2ivkgcvcv63v2')
    .replace('postgres://', 'postgresql://', 1)
    )


# Read source data
def read_source(source_path):
    if source_path.startswith('sqlite'):
        source_engine = create_engine(source_path)
        source_conn = source_engine.connect()
        source_df = pd.read_sql(
            TABLE_NAME, source_conn,index_col=INDEX_COLUMN)

    elif source_path.lower().endswith('csv'):
        source_df = pd.read_csv(source_path)

    else:
        raise TypeError("Unsupported file format")

    return source_df


# Create the table
def write_target(source_df):
    target_engine = create_engine(TARGET_DATABASE_URL)
    target_conn = target_engine.connect()
    source_df.to_sql(TABLE_NAME, target_conn, if_exists='replace')

    # sqlalchemy will not detect table without PK. This seems to be the best
    # solution (https://stackoverflow.com/q/50469391)
    target_engine.execute(
        f'ALTER TABLE {TABLE_NAME} ADD PRIMARY KEY ({INDEX_COLUMN});')
    target_engine.execute(
        f'ALTER TABLE {TABLE_NAME} DROP COLUMN "index";')


if __name__ == '__main__':
    source_data = read_source(SOURCE_PATH)
    write_target(source_data)