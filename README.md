# csv-to-boxplot

a small tool to convert CSV-based data (e.g., from a google spreadsheet) into data that can be used by the LaTeX [pgfplots](https://ctan.org/pkg/pgfplots) library to display boxplots. the tool doesn't feature a sophisticated CSV parser: it expects the input to have a header row and all other values to be numeric and comma-separated.

the tool expects data to be one column per item (e.g., a survey question). see `test.csv` for an example.

### usage

exemplary usage: run `# cat test.csv | csv-to-boxplot > boxplot.txt` in your terminal. in your TeX document, import the data as follows:

```tex
\begin{tikzpicture}
  \begin{axis} [box plot width=2mm]
    \boxplot [forget plot, red] {boxplot.txt}
  \end{axis}
\end{tikzpicture}
```
