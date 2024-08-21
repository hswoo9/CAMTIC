package egovframework.com.devjitsu.system.service.impl;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import egovframework.com.devjitsu.system.repository.MenuManagementRepository;
import egovframework.com.devjitsu.system.service.MenuManagementService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class MenuManagementServiceImpl implements MenuManagementService {

    private static final Logger logger = (Logger) LoggerFactory.getLogger(MenuManagementServiceImpl.class);

    @Autowired
    private MenuManagementRepository menuManagementRepository;

    @Override
    public void setMenuPathUpd(Map<String, Object> params) {
        menuManagementRepository.setMenuPathUpd(params);
    }

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

    @Override
    public List<Map<String, Object>> getMenuList(Map<String, Object> params) {
        return menuManagementRepository.getMenuList(params);
    }

    @Override
    public void setMenu(Map<String, Object> params) {
        List<Map<String, Object>> duplicationList = menuManagementRepository.getMenuSortDuplicationList(params);
        for(Map<String, Object> map : duplicationList){
            menuManagementRepository.setMenuSortDuplicationUpd(map);
        }

        if(StringUtils.isEmpty(params.get("menuId"))){
            menuManagementRepository.setMenu(params);
        }else {
            menuManagementRepository.setMenuUpd(params);
        }

        menuManagementRepository.setMenuPathUpd(params);
    }

    @Override
    public void setMenuDel(Map<String, Object> params) {
        menuManagementRepository.setMenuDel(params);
    }

    @Override
    public List<Map<String, Object>> getMenuAuthorityGroupList(Map<String, Object> params) {
        return menuManagementRepository.getMenuAuthorityGroupList(params);
    }

    @Override
    public Map<String, Object> getMenuAuthorityGroup(Map<String, Object> params) {
        Map<String, Object> result = new HashMap<>();

        result.put("authorityGroup", menuManagementRepository.getMenuAuthorityGroup(params));
        result.put("accessMenu", menuManagementRepository.getAuthorityGroupAccessMenu(params));

        return result;
    }

    @Override
    public void setMenuAuthorityGroupDel(List<String> agiAr) {
        menuManagementRepository.setMenuAuthorityGroupDel(agiAr);
    }

    @Override
    public void setMenuAuthorityGroup(Map<String, Object> params) {
        if(StringUtils.isEmpty(params.get("authorityGroupId"))){
            menuManagementRepository.setMenuAuthorityGroup(params);
        }else {
            menuManagementRepository.setMenuAuthorityGroupUpd(params);
        }

        Gson gson = new Gson();
        List<Map<String, Object>> allowAccessList = gson.fromJson((String) params.get("menuData"), new TypeToken<List<Map<String, Object>>>() {}.getType());
        for(int i = 0; i < allowAccessList.size(); i++){
            allowAccessList.get(i).put("authorityGroupId", params.get("authorityGroupId"));
        }

        menuManagementRepository.delAuthorityGroupAccessMenu(params);
        if(allowAccessList.size() > 0){
            menuManagementRepository.setAuthorityGroupAccessMenu(allowAccessList);
        }
    }

    @Override
    public List<Map<String, Object>> getAuthorityGroupUserList(Map<String, Object> params) {
        return menuManagementRepository.getAuthorityGroupUserList(params);
    }

    @Override
    public void setAuthorityGroupUser(Map<String, Object> params) {
        Gson gson = new Gson();
        List<Map<String, Object>> authorityUserList = gson.fromJson((String) params.get("authorityUserArr"), new TypeToken<List<Map<String, Object>>>() {}.getType());
        for(Map<String, Object> map : authorityUserList){
            if(StringUtils.isEmpty(map.get("authorityGrantId"))){
                menuManagementRepository.setAuthorityGroupUser(map);
            }else{
                menuManagementRepository.setAuthorityGroupUserUpd(map);
            }
        }
    }

    @Override
    public void setAuthorityGroupUserDel(List<String> aguAr) {
        menuManagementRepository.setAuthorityGroupUserDel(aguAr);
    }

    @Override
    public List<Map<String, Object>> getRequestBoardMenuList(Map<String, Object> params) {
        return menuManagementRepository.getRequestBoardMenuList(params);
    }
}
