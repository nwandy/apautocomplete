# ApAutocomplete

Autocomplete jQuery+Bootstrap

Crea autocomplete per qualunque campo input.
L'origine dei dati può essere un array di valori oppure una chiamata ajax.
Esempi:
 

    <input class="form-control " id="myid" name="myid" type="text" value="">
    <script>
    var lista = [
    {
        "Mese": 12,
        "Anno": 2025,
        "Ore": 8,
        "Type": "p",
        "NomeCompleto": "Opera Giovanna",
        "Cognome": "Opera",
        "Nome": "Giovanna",
        "Id": 936,
        "Giorno": 1
    },
    {
        "Mese": 12,
        "Anno": 2025,
        "Ore": 8,
        "Type": "p",
        "NomeCompleto": "Opera Giovanna",
        "Cognome": "Opera",
        "Nome": "Giovanna",
        "Id": 936,
        "Giorno": 2
    },
    {
        "Mese": 12,
        "Anno": 2025,
        "Ore": 8,
        "Type": "p",
        "NomeCompleto": "Opera Giovanna",
        "Cognome": "Opera",
        "Nome": "Giovanna",
        "Id": 936,
        "Giorno": 3
    },
    {
        "Mese": 12,
        "Anno": 2025,
        "Ore": 8,
        "Type": "p",
        "NomeCompleto": "Opera Giovanna",
        "Cognome": "Opera",
        "Nome": "Giovanna",
        "Id": 936,
        "Giorno": 4
    }]
    
    $("#myid").apautocomplete({
     queryfield: "Nome",
     valuefield: "NomeCompleto",
     querylen: 2,
     mustexists: true,
     data: lista,
     type:"json",
     maxlen: 10,
     fields: [
         "Id", "Cognome", "Nome","Giorno", "Mese", "Anno", "Ore", "Type"],
     view:"list",
   	});
	</script>

Campi e definizioni:
**queryfield**: nome della variabile che verrà aggiunta all'url con il valore da selezionare 
		*obbligatorio*
**valuefield**: nome del campo dell'array da inserire nel campo input quando viene selezionata la riga
		*obbligatorio*
**fields**: elenco dei campi del risultato da visualizzare 
		*obbligatorio*
**mustexist**: flag per accettare solo i valori della lista
		*default true*
**querylen**: numero di caratteri da digitare prima che parta la ricerca
		*default 1*
**maxlen**: numero di righe risultato da visualizzare
		*default 10*
**select**: funzione richiamata quando si seleziona un valore 
		*non obbligatorio*
**view**: tipo visualizzazione: table o list
		*default "list"*
**type**: tipo di dato da utilizzare: ajax o json
		*default ajax*
**data**: riferimento ad array con dati
		*obbligatorio se type=json*
**url**: funzione da richiamare per lettura e filtro dati  
		*obbligatorio se type=ajax*
Esempio
 valori:
	url: funzione da richiamare che ritorna array object json (es: [{id:1, val:"abc"},{{id:2, val:"cde"}])(es url: ActionResult getData(string val)
		obbligatorio
	queryfield: nome della variabile che verrà aggiunta all'url con il valore da selezionare (es sopra: "val")
		obbligatorio
	valuefield: nome del campo dell'array da inserire nel campo input quando selezionata la riga
		obbligatorio
	querylen: numero di caratteri da digitare prima che parta la ricerca
		default 1
	maxlen: numero di righe risultato da visualizzare
		default 10
	select: funzione richiamata quando si seleziona un valore (per interagire con altri campi della pagina, ad esempio)
		non obbligatoria
	fields: elenco dei campi del risultato da visualizzare (es: "id", "val")
		obbligatorio
	view: tipo visualizzazione: table o list
		default "list"
