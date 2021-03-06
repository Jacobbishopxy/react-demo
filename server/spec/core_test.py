"""
@author Jacob Xie
@time 3/11/2021
"""
import os
import sys
import inspect
current_dir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parent_dir = os.path.dirname(current_dir)
sys.path.insert(0, parent_dir)


if __name__ == "__main__":

    from sqlalchemy import create_engine
    from sqlalchemy.schema import CreateTable

    from core import Connector, Loader
    from core.url import Url

    from core.dto import CyberbrickType, CyberbrickColumn, CyberbrickTable, to_table

    url = Url("postgresql+psycopg2",
              "admin",
              "admin",
              "localhost",
              5432,
              "dev")
    engine = create_engine(url.to_url())
    conn = Connector(engine)
    loader = Loader(conn)

    _name = "core_test_create_table"
    _raw_table = CyberbrickTable(
        _name,
        [
            CyberbrickColumn("id", CyberbrickType.STRING, primary=True),
            CyberbrickColumn("v1", CyberbrickType.NUMBER),
        ]
    )

    _table = to_table(_raw_table, conn.meta)

    # 1. Create a table
    conn.conn.execute(CreateTable(_table))

    # 2. Insert value to an existing table
    c = loader.table_cls(_name)
    d = c(**{"id": "a", "v1": 1})

    conn.session.add(d)
    conn.session.commit()
    conn.session.close()
