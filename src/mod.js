const BClass = require("C:/snapshot/project/obj/models/enums/BaseClasses");
const LTColor = require("C:/snapshot/project/obj/models/spt/logging/LogTextColor");

class unbreakable_keys {
    CFG;
    Logger;
    DataBase;
    postDBLoad(container)
    {
        this.CFG = require("../config/config.json");
        this.Logger = container.resolve("WinstonLogger");
        this.DataBase = container.resolve("DatabaseServer");

        const dbTables = this.DataBase.getTables();
        const dbItems = dbTables.templates.items

        for (const item in dbItems)
        {
            const itemProps = dbItems[item]._props;
            if (this.CFG.enable_blacklist && this.CFG.blacklisted_keys.includes(dbItems[item]._id))
                continue;

            if (dbItems[item]._parent == BClass.BaseClasses.KEY_MECHANICAL) {
                itemProps.DiscardLimit = -1;

                if (this.CFG.unbreakable_keys)
                    itemProps.MaximumNumberOfUsage = 0;

                if (this.CFG.weightless_keys)
                    itemProps.Weight = 0.0;
            }

            if (dbItems[item]._parent == BClass.BaseClasses.KEYCARD) {
                itemProps.DiscardLimit = -1;

                if (this.CFG.unbreakable_keycards)
                    itemProps.MaximumNumberOfUsage = 0;

                if (this.CFG.weightless_keycards)
                    itemProps.Weight = 0.0;
            }
        }
        this.Logger.log("[unbreakable-keys] has been loaded.", LTColor.LogTextColor.CYAN);
    }
}

module.exports = { mod: new unbreakable_keys() };