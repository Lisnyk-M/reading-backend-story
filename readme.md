### Working page:  
https://reading-dev-story-5700b910bf89.herokuapp.com/

### For Reading developers

### Endpoints:  
POST: /create-story   
GET:  /stories/:id/   
GET:  /stories/   


### for create story:   
               in body{
                    "title": "Mars",
                    "description": " MARSSSSSSSSS... When the EHT is looking at polarization in astronomical sources, we're really looking for information about the structure of magnetic fields, said Broderick, who is also a professor at the University of Waterloo. Broderick said he helped devise the techniques that allowed the team to capture the polarized light. The image researchers captured is not of the black hole closest to Earth, however, but of one at the centre of neighbouring galaxy Messier 87 that was easier to observe by telescope. It is about six billion times the mass of our sun and located about 53 million light years from Earth. One light year is equal to 9.5 trillion kilometres.",
                    "storyType": "any",
                    "images": 
                    [
                        {
                            "location": [1, 2],
                            "src": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWCSoAcwVcztL6bDnd9BCVb6xaov4RFH7aDw&usqp=CAU"
                        },
                        {
                            "location": [3],
                            "src": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSZfK23dXFGP6D2taQ22Lud5TNuvDQZurT5Q&usqp=CAU"
                        },
                        {
                            "location": [4],
                            "src": "https://www.gettyimages.pt/gi-resources/images/Homepage/Hero/PT/PT_hero_42_153645159.jpg"
                        },
                        {
                            "location": [3],
                            "src": "https://cdn.xxl.thumbs.canstockphoto.com/white-waterlily-in-nature-pond-flowers-image-stock-image_csp10306162.jpg"
                        }                                                
                    ]
}

### for recive story:    
                example: GET  /stories/64f4a35b16032635f88151cb   
 

### for recive stories:   
                example: GET  /stories/   
                                      