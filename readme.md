### Working page:  
https://ads-creator.herokuapp.com/

### Endpoints:  
POST: /create-ad   
GET:  /ads/:id/   
GET:  /ads   


### for create ad:   
               in body {
                    "title": "car",   
                    "description": "it is great car",   
                    "price": 5900,   
                    "links": ["https://www.images-holder/2123.jpg", "https://www.images-holder/23.jpg",    "https://www.images-holder/123.jpg"]   
                } 

### for recive ad:   
                optional param: fields                   
                valid value for param fields: 'description', 'links'   
                example: GET  /ads/3432323232344?fields=description,links   
                or: GET  /ads/3432323232344?fields=links   

### for recive ads:   
                optional params: param sort_by_price, sort_by_date, title, page   
                                    
                valid value for param sort_by_price and sort_by_date: 1, -1      
                example: GET  /ads?title=car&sort_by_price=-1    
                or: GET  /ads   
                param title a snippet of text that will be searched in the ad title  
                page: number of page    
                                      