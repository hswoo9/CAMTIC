package egovframework.devjitsu.common.utiles;

import org.apache.commons.configuration.Configuration;
import org.apache.commons.configuration.ConfigurationException;
import org.apache.commons.configuration.PropertiesConfiguration;

public class CtGetProperties {

    public static String getKey(String key) {

        try {
            Configuration config = new PropertiesConfiguration("/egovframework/egovProps/config-dev.properties");
            return config.getString(key);
        } catch (ConfigurationException e) {
            e.printStackTrace();
        }

        return null;

    }
}