package egovframework.com.devjitsu.system.service.impl;

import com.google.gson.Gson;
import egovframework.com.devjitsu.system.repository.MenuManagementRepository;
import egovframework.com.devjitsu.system.service.MenuManagementService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class MenuManagementServiceImpl implements MenuManagementService {

    private static final Logger logger = (Logger) LoggerFactory.getLogger(MenuManagementServiceImpl.class);

    @Autowired
    private MenuManagementRepository menuManagementRepository;

    @Override
    public String getStringMenuList(Map<String, Object> params) {
        List<Map<String, Object>> menuList = menuManagementRepository.getMenuList(params);
        List<Map<String, Object>> result = new ArrayList<Map<String, Object>>();

        for (Map<String, Object> menu : menuList) {
            menu.put("expanded", true);
            for (Map<String, Object> menu2 : menuList) {

                if(menu2.get("UPPER_MENU_ID").equals(menu.get("MENU_ID"))){
                    List<Map<String, Object>> sub = new ArrayList<Map<String, Object>>();

                    if(menu.containsKey("items")){
                        sub = (List<Map<String, Object>>) menu.get("items");
                        sub.add(menu2);
                        menu.put("items", sub);
                    }else{
                        sub.add(menu2);
                        menu.put("items", sub);
                    }

                }

            }
            if(menu.get("MENU_DEPTH").equals("0")){
                result.add(menu);
            }
        }

        return new Gson().toJson(result);
    }
}
