# ApAutocomplete

Autocomplete jQuery+Bootstrap

Create an autocomplete list for any input field. 

The data source can be an array of values, a JSON object, or an AJAX call. 

Easy, simple, useful!

[Demo and Samples][samples]


Fields and definition:
 
**queryfield**: variable name added to query ```sh(http://mysite.com/<url>?<queryfiled>=<entered value>)```

*mandatory - default="value"*

**valuefield**: field name in json object that will be inserted in input field

*mandatory if array is a json object*
	
**fields**: fields list to show

*mandatory if array is a json object*
		
**mustexist**: if true, only list values are accepted

*default true*
		
**querylen**: chras number to start query

*default 1*
		
**maxlen**: rows number to show in list in every page

*default 10*
		
**select**: function when value is selected

*not mandatory*
		
**view**: tipo visualizzazione: table o list

*default "list"*
		
**type**: view type: ajax or json

*default json*

**data**: variable or function with data values

*mandatory if type=json*
		
**url**: web service or function to call if ajax

*mandatory if type=ajax*
 
**Samples:**

**Sample 1: autocomplete from Json**
 

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


**Sample 2: autocomplete from Ajax**
 

    <input class="form-control " id="myid" name="myid" type="text" value="">
    <script>
    
    $("#myid").apautocomplete({
     queryfield: "Nome",
     valuefield: "NomeCompleto",
     querylen: 2,
     mustexists: true,
     maxlen: 10,
     fields: [
         "Id", "Cognome", "Nome","Giorno", "Mese", "Anno", "Ore", "Type"],
     view:"list",
	 url:"/getData",
   	});
	</script>
 [samples]: <https://www.netweb.it/indexen.html>
		
 
