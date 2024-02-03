from setuptools import find_packages, setup

setup(
    name="rag-mongo",
    version="0.0.1",
    # url="https://github.com/BatsResearch/zero-shift",
    python_requires=">=3.8",
    # install_requires=requirements,
    classifiers=[
        "Development Status :: 2 - Pre-Alpha",
        "Programming Language :: Python :: 3.9",
    ],
    description="Mongo RAG.",
    packages=find_packages(),
)