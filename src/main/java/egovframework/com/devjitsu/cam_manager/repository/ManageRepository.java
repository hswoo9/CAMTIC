package egovframework.com.devjitsu.cam_manager.repository;

import egovframework.com.devjitsu.gw.login.repository.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class ManageRepository extends AbstractDAO {
    public List<Map<String, Object>> getPurcReqManageList(Map<String, Object> params) { return selectList("manage.getPurcReqManageList", params);};
    public void setPurcReq(Map<String, Object> params) { insert("manage.setPurcReq", params);}
    public void setPurcReqUpd(Map<String, Object> params) { update("manage.setPurcReqUpd", params);}
    public void setPurcItem(Map<String, Object> params) { insert("manage.setPurcItem", params);}
    public void setPurcItemUpd(Map<String, Object> params) { update("manage.setPurcItemUpd", params);}
    public Map<String, Object> getPurcReq(Map<String, Object> params) { return (Map<String, Object>) selectOne("manage.getPurcReq", params);}
    public Map<String, Object> getPurcReqFileInfo(Map<String, Object> params) { return (Map<String, Object>) selectOne("manage.getPurcReqFileInfo", params);}
    public List<Map<String, Object>> getPurcItemList(Map<String, Object> params) { return selectList("manage.getPurcItemList", params);}


}
