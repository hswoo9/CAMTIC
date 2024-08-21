package egovframework.com.devjitsu.system.repository;

import egovframework.com.devjitsu.gw.login.dto.LoginVO;
import egovframework.com.devjitsu.gw.login.repository.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class MenuManagementRepository extends AbstractDAO {
    public List<Map<String, Object>> getMainMenuList(LoginVO loginVO) { return selectList("menu.getMainMenuList", loginVO);}
    public void setMenuPathUpd(Map<String, Object> params) { update("menu.setMenuPathUpd", params);}
    public List<Map<String, Object>> getMenuList(Map<String, Object> params) {return selectList("menu.getMenuList", params);}

    public List<Map<String, Object>> getMenuSortDuplicationList(Map<String, Object> params) {return selectList("menu.getMenuSortDuplicationList", params);}
    public void setMenuSortDuplicationUpd(Map<String, Object> params) { update("menu.setMenuSortDuplicationUpd", params);}
    public void setMenu(Map<String, Object> params) {
        insert("menu.setMenu", params);
        update("menu.setUpperMenuChildrenY", params);
    }
    public void setMenuUpd(Map<String, Object> params) { update("menu.setMenuUpd", params);}
    public void setMenuDel(Map<String, Object> params) { delete("menu.setMenuDel", params);}

    public List<Map<String, Object>> getMenuAuthorityGroupList(Map<String, Object> params) { return selectList("menu.getMenuAuthorityGroupList", params);}
    public Map<String, Object> getMenuAuthorityGroup(Map<String, Object> params) { return (Map<String, Object>) selectOne("menu.getMenuAuthorityGroup", params);}
    public List<Map<String, Object>> getAuthorityGroupAccessMenu(Map<String, Object> params) { return selectList("menu.getAuthorityGroupAccessMenu", params);}
    public void setMenuAuthorityGroupDel(List<String> agiAr) {
        delete("menu.setMenuAuthorityGroupDel", agiAr);
        delete("menu.setMenuAuthorityGroupInUserDel", agiAr);
    }
    public void setMenuAuthorityGroup(Map<String, Object> params) { insert("menu.setMenuAuthorityGroup", params);}
    public void setMenuAuthorityGroupUpd(Map<String, Object> params) { insert("menu.setMenuAuthorityGroupUpd", params);}
    public void setAuthorityGroupAccessMenu(List<Map<String, Object>> list) { insert("menu.setAuthorityGroupAccessMenu", list);}
    public void delAuthorityGroupAccessMenu(Map<String, Object> params) { delete("menu.delAuthorityGroupAccessMenu", params);}

    public List<Map<String, Object>> getAuthorityGroupUserList(Map<String, Object> params){ return selectList("menu.getAuthorityGroupUserList", params);}
    public void setAuthorityGroupUser(Map<String, Object> params){ insert("menu.setAuthorityGroupUser", params);}
    public void setAuthorityGroupUserUpd(Map<String, Object> params){ insert("menu.setAuthorityGroupUserUpd", params);}
    public void setAuthorityGroupUserDel(List<String> aguAr){ delete("menu.setAuthorityGroupUserDel", aguAr);}
    public List<Map<String, Object>> getRequestBoardMenuList(Map<String, Object> params) {return selectList("menu.getRequestBoardMenuList", params);}
}
