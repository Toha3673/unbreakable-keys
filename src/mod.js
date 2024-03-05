const BClass = require("C:/snapshot/project/obj/models/enums/BaseClasses");
const LTColor = require("C:/snapshot/project/obj/models/spt/logging/LogTextColor");

class unbreakable_keys {
    postDBLoad(container)
    {
        let cfg = require("../config/config.json");
        const logger = container.resolve("WinstonLogger");
        const data = container.resolve("DatabaseServer");

        if (cfg.enabled)
        {
            const dbTables = data.getTables();
            const dbItems = dbTables.templates.items

            for (const item in dbItems) {
                const itemProps = dbItems[item]._props;
                if (dbItems[item]._parent == BClass.BaseClasses.KEY_MECHANICAL) {
                    itemProps.DiscardLimit = -1;

                    if (!cfg.affects_legendary_keys && itemProps.BackgroundColor == "yellow")
                        continue;

                    if (cfg.unbreakable_keys)
                        itemProps.MaximumNumberOfUsage = 0;

                    if (cfg.weightless_keys)
                        itemProps.Weight = 0.0;
                }
                if (dbItems[item]._parent == BClass.BaseClasses.KEYCARD) {
                    itemProps.DiscardLimit = -1;

                    if (!cfg.affects_legendary_keycards && itemProps.BackgroundColor == "yellow")
                        continue;

                    if (cfg.unbreakable_keycards)
                        itemProps.MaximumNumberOfUsage = 0;

                    if (cfg.weightless_keycards)
                        itemProps.Weight = 0.0;
                }
            }

            logger.log(`[unbreakable-keys] has been loaded.`, LTColor.LogTextColor.CYAN);
        }
        else
        {
            logger.log(`[unbreakable-keys] mod is disabled.`, LTColor.LogTextColor.CYAN);
        }
    }
}

module.exports = { mod: new unbreakable_keys() };