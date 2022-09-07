import { BlockLocation, Location, world } from "mojang-minecraft";
import { Noise } from "./Noise";

const Overworld = world.getDimension("overworld");

(async () => {

    const noise = await new Noise(80).GenerateMap(50);

    for(let i = 0; i < 25; i++)
    {
        await noise.SmoothMap();
    }

    await noise.ForEachElement((x, y, value) => {

        let block = Overworld.getBlock(new BlockLocation(x, 20, y));

        if(block.id != "minecraft:air")
            Overworld.runCommand(`setblock ${x} -61 ${y} air`);

        Overworld.runCommand(`setblock ${x} -61 ${y} ${GetBlockFromNumber(value)}`);
    });

})();

function GetBlockFromNumber(number : number) : string
{
    if(number == 0)
        return "minecraft:stone";
    else
        return "minecraft:obsidian";
}