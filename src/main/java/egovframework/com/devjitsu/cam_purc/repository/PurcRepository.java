package egovframework.com.devjitsu.cam_purc.repository;

import egovframework.com.devjitsu.gw.login.repository.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class PurcRepository extends AbstractDAO {


    public List<Map<String, Object>> getPurcReqList(Map<String, Object> params) { return selectList("purc.getPurcReqList", params);};
    public void setPurcReq(Map<String, Object> params) { insert("purc.setPurcReq", params);}
    public void setPurcReqUpd(Map<String, Object> params) { update("purc.setPurcReqUpd", params);}
    public void setPurcItem(Map<String, Object> params) { insert("purc.setPurcItem", params);}
    public void setPurcItemUpd(Map<String, Object> params) { update("purc.setPurcItemUpd", params);}
    public Map<String, Object> getPurcReq(Map<String, Object> params) { return (Map<String, Object>) selectOne("purc.getPurcReq", params);}
    public List<Map<String, Object>> getPurcItemList(Map<String, Object> params) { return selectList("purc.getPurcItemList", params);}
    public Map<String, Object> getPurcItemAmtTotal(Map<String, Object> params) { return (Map<String, Object>) selectOne("purc.getPurcItemAmtTotal", params);}
    public Map<String, Object> getPurcClaimItemAmtTotal(Map<String, Object> params) { return (Map<String, Object>) selectOne("purc.getPurcClaimItemAmtTotal", params);}
    public Map<String, Object> getPurcReqFileInfo(Map<String, Object> params) { return (Map<String, Object>) selectOne("purc.getPurcReqFileInfo", params);}
    public void updatePurcApprStat(Map<String, Object> params) { update("purc.updatePurcApprStat", params); }
    public void updatePurcFinalApprStat(Map<String, Object> params) { update("purc.updatePurcFinalApprStat", params); }
    public void updateClaimApprStat(Map<String, Object> params) { update("purc.updateClaimApprStat", params); }
    public void updateClaimFinalApprStat(Map<String, Object> params) { update("purc.updateClaimFinalApprStat", params); }


    public List<Map<String, Object>> getMngReqPurcList(Map<String, Object> params) {
        return selectList("purc.getMngReqPurcList", params);
    }

    public void updPurcItemStat(Map<String, Object> params) {
        update("purc.updPurcItemStat", params);
    }

    public void insPurcClaimItem(Map<String, Object> map) {
        insert("purc.insPurcClaimItem", map);
    }

    public void updPurcClaimItem(Map<String, Object> map) {
        update("purc.updPurcClaimItem", map);
    }

    public Map<String, Object> getPurcClaimData(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("purc.getPurcClaimData", params);
    }

    public void insPurcClaimData(Map<String, Object> params) {
        insert("purc.insPurcClaimData", params);
    }

    public void updPurcClaimData(Map<String, Object> params) {
        update("purc.updPurcClaimData", params);
    }

    public List<Map<String, Object>> getPurcClaimItemList(Map<String, Object> params) {
        return selectList("purc.getPurcClaimItemList", params);
    }

    public void delPurcClaimItem(Map<String, Object> params) {
        delete("purc.delPurcClaimItem", params);
    }

    public void delPurcItem(Map<String, Object> params) {
        delete("purc.delPurcItem", params);
    }

    public List<Map<String, Object>> getPurcClaimList(Map<String, Object> params) {
        return selectList("purc.getPurcClaimList", params);
    }
}
