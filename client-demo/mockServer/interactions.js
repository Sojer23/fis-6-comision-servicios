const RESEARCHERS_BODY = [
    {name:"Manuel",
    surname:"Carranza",
    dni:"00000001A",
    certification:"Associate Professor",
    studyCentre:"Universidad de Sevilla",
    scientificTechnicalArea:[],
    department:"LSI",
    responsible:false,
    active:true,
    entryDate:"2019-01-07T12:15:24.964Z",
    publications:[]},

    {name:"Miguel",
    surname:"Esteban",
    dni:"00000003C",
    certification:"Associate Professor",
    studyCentre:"Escuela Tecnica Superior de Ingenieria Informatica",
    scientificTechnicalArea:["Deep Learning","Machine Learning"],
    department:"LSI",
    responsible:false,
    active:true,
    entryDate:"2019-01-07T12:26:17.916Z",
    publications:[]},

    {name:"José",
    surname:"Gallardo Gallardo",
    dni:"00000002B",
    certification:"Associate Professor",
    studyCentre:"Escuela Tecnica Superior de Ingenieria Informatica",
    scientificTechnicalArea:["Cloud","SLA"],
    department:"LSI",
    responsible:false,
    active:true,
    entryDate:"2019-01-07T12:28:26.729Z",
    publications:[]}
]

module.exports = {
    getResearcherList: {
        state: 'it has 3 researchers',
        uponReceiving: 'a request to retrieve the list of researchers',
        withRequest: {
            method: 'GET',
            path: '/api/v1/researchers'
        },
        willRespondWith: {
            status: 200,
            body: RESEARCHERS_BODY
        }
    }

    // TODO: quizas meter un get con parametro id.
}