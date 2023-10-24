package egovframework.com.devjitsu.cam_manager.repository;

import egovframework.com.devjitsu.gw.login.repository.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class PayAppRepository extends AbstractDAO {
    public void insPayAppData(Map<String, Object> params) {
        insert("payApp.insPayAppData", params);
    }

    public void updPayAppData(Map<String, Object> params) {
        update("payApp.updPayAppData", params);
    }

    public Map<String, Object> getPayAppReqData(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("payApp.getPayAppReqData", params);
    }

    public void insPayAppDetailData(Map<String, Object> map) {
        insert("payApp.insPayAppDetailData", map);
    }

    public void delPayAppDetailData(Map<String, Object> params) {
        delete("payApp.delPayAppDetailData", params);
    }

    public List<Map<String, Object>> getPayAppDetailData(Map<String, Object> params) {
        return selectList("payApp.getPayAppDetailData", params);
    }
}
