class unbreakable_keys {
    postDBLoad(container) {
        const mod = require("../package.json").name;
        const сfg = require("../config/config.json");
        const color = require("C:/snapshot/project/obj/models/spt/logging/LogTextColor").LogTextColor;
        const baseClasses = require("C:/snapshot/project/obj/models/enums/BaseClasses").BaseClasses;

        const logger = container.resolve("WinstonLogger");
        const db = container.resolve("DatabaseServer").getTables();

        const dbItems = db.templates.items

        for (const item in dbItems) {
            const itemProps = dbItems[item]._props;
            if (сfg.enable_blacklist && сfg.blacklisted_keys.includes(dbItems[item]._id))
                continue;

            if (dbItems[item]._parent == baseClasses.KEY_MECHANICAL) {
                itemProps.DiscardLimit = -1;

                if (сfg.unbreakable_keys)
                    itemProps.MaximumNumberOfUsage = 0;

                if (сfg.weightless_keys)
                    itemProps.Weight = 0.0;
            }

            if (dbItems[item]._parent == baseClasses.KEYCARD) {
                itemProps.DiscardLimit = -1;

                if (сfg.unbreakable_keycards)
                    itemProps.MaximumNumberOfUsage = 0;

                if (сfg.weightless_keycards)
                    itemProps.Weight = 0.0;
            }
        }

        logger.log(`"${mod}" has been loaded.`, color.CYAN);
    }
}

module.exports = { mod: new unbreakable_keys() };