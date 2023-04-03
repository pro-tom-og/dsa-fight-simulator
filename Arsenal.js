
class Arsenal {

    static log(...theArgs)
    {
        // console.log(...theArgs);

    }

    static getFighter()
    {
        return[
          this.getAlrik()
          ,this.getBalrik()
          ,this.getZwerg()
          ,this.getTroll()
          ,this.getOrk()
        ];
    }

    static getAlrik (name="Alrik")
    {
        return {
            "name":name
            ,"armor":2
            ,"attack":12
            ,"parade":8
            ,"hitpoints":24
            ,"initiative":3
            ,"weaponStats": {"w":1,"bonus":1}
        };
    }

    static getBalrik (name="Sir Balrik")
    {
        return {
            "name":name
            ,"armor":3
            ,"attack":15
            ,"parade":10
            ,"hitpoints":55
            ,"initiative":3
            ,"weaponStats": {"w":1,"bonus":1}
        };
    }
    static getZwerg (name="Ingramasch")
    {
        return {
            "name":name
            ,"armor":4
            ,"attack":17
            ,"parade":6
            ,"hitpoints":45
            ,"initiative":3
            ,"weaponStats": {"w":2,"bonus":6}
        };
    }

    static getTroll (name="Troll")
    {
        return {
            "name":name
            ,"armor":2
            ,"attack":14
            ,"parade":9
            ,"hitpoints":125
            ,"initiative":14
            ,"weaponStats": {"w":3,"bonus":14}
        };
    }


    static getOrk (name="Grunzhh")
    {
        return {
            "name":name
            ,"armor":4
            ,"attack":16
            ,"parade":10
            ,"hitpoints":40
            ,"initiative":3
            ,"weaponStats": {"w":2,"bonus":4}

        };
    }



}