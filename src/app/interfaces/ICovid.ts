
export interface ICovid {
    continent: string;
    country:string;
    population:number;
    cases: ICases,
    deaths: IDeaths,
    tests: ITests,
    day: string,
    time: string,
}

export interface ICases {
    new:string;
    active:number;
    critical:null;
    recovered:number;
    "1M_pop": string;
    total:number
}

export interface IDeaths {
    new:string;
    "1M_pop":string;
    total:number;
}

export interface ITests {
    "1M_pop":string;
    total:number;
}