Useful Commands
===============

For anything Python-related below, first activate your Python virtualenv. I like
using pipenv.

Get Dependencies Installed
--------------------------

```shell
python setup.py install
cd streamlit_tags/frontend
npm install
```

Serve Component
---------------

First, edit [__init__.py](streamlit_tags/__init__.py) such that
`_RELEASE = False`.

```shell
npm run start
```

Run Example Application
-----------------------

```shell
streamlit run examples/app.py --server.address 0.0.0.0
```

streamlit run examples/app.py --server.address 0.0.0.0

Build A Wheel File for Distribution
-----------------------------------

See [Publish a Component](https://docs.streamlit.io/library/components/publish)
for full details.

First, edit [__init__.py](streamlit_tags/__init__.py) such that
`_RELEASE = True`.

```shell
npm run build  # Build the Webpack assets
python setup.py sdist bdist_wheel  # Build source distribution and binary wheel
```

The build artifacts will be under *dist/*.
