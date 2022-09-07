export class Noise
{

    private width : number;
    private height : number;
    private map : number[][];

    public get Map() { return this.map; }

    public constructor(width : number, height : number = width)
    {
        this.width = width;
        this.height = height;
    }

    public async GenerateMap(density : number)
    {
        var map : number[][] = new Array(this.width);
        for (var i = 0; i < this.width; i++)
        {
            map[i] = new Array(this.height);
        }

        for(let i = 0; i < this.width; i++)
        {
            for(let j = 0; j < this.height; j++)
            {
                map[i][j] = (Math.floor(Math.random() * 100) < density) ? 1 : 0;
            }
        }

        this.map = map;

        return this;
    }

    public async SmoothMap()
    {
        for(let i = 0; i < this.width; i++)
        {
            for(let j = 0; j < this.height; j++)
            {
                let neighbourWallTiles = this.GetSurroudingWallCount(i, j);

                if(neighbourWallTiles > 4)
                    this.map[i][j] = 1;
                else if(neighbourWallTiles < 4)
                    this.map[i][j] = 0;
            }
        }
    }

    public async ForEachElement(callback : (x : number, y : number, value : number) => void)
    {
        for(let i = 0; i < this.width; i++)
        {
            for(let j = 0; j < this.height; j++)
            {
                callback(i, j, this.map[i][j]);
            }
        }
    }

    private GetSurroudingWallCount(x : number, y : number) : number
    {
        let wallCount = 0;

        for(let nX = x -1; nX <= x + 1; nX++)
        {
            for(let nY = y -1; nY <= y + 1; nY++)
            {
                if(nX >= 0 && nX < this.width && nY >= 0 && nY < this.height)
                {
                    if(nX != x || nY != y)
                    {
                        wallCount += this.map[nX][nY] == 1 ? 1 : 0;
                    }
                }
                else
                {
                    wallCount++;
                }
            }
        }

        return wallCount;
    }

}