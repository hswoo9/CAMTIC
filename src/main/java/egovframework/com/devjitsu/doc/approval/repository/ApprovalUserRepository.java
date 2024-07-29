package egovframework.com.devjitsu.doc.approval.repository;

import egovframework.com.cmm.config.WebSocketHandler;
import egovframework.com.devjitsu.gw.login.dto.LoginVO;
import egovframework.com.devjitsu.gw.login.repository.AbstractDAO;
import org.springframework.stereotype.Repository;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.adapter.jetty.JettyWebSocketSession;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Repository
public class ApprovalUserRepository extends AbstractDAO {

    /** 상신/보관함 */
    public List<Map<String, Object>> getDraftFormList() { return selectList("approvalUser.getDraftFormList");}
    public List<Map<String, Object>> getUserDocStorageBoxList(Map<String, Object> params) { return selectList("approvalUser.getUserDocStorageBoxList", params);}
    public List<Map<String, Object>> getUserReadDocStorageBoxList(Map<String, Object> params) { return selectList("approvalUser.getUserReadDocStorageBoxList", params);}

    public void setCheckedDocDel(List<Map<String, Object>> params) { update("approvalUser.setCheckedDocDel", params);}
    public void setDocIdNull(Map<String, Object> params) { update("approvalUser.setDocIdNull", params);}
    public void setDocDel(Map<String, Object> params) { update("approvalUser.setDocDel", params);}

    /** 결재함 */
    public List<Map<String, Object>> getEmpDeptList(Map<String, Object> params) { return selectList("approvalUser.getEmpDeptList", params);}
    public List<Map<String, Object>> getAbsentUserList(Map<String, Object> params) { return selectList("approvalUser.getAbsentUserList", params);}
    public List<Map<String, Object>> getDeptPathList(Map<String, Object> params) { return selectList("approvalUser.getDeptPathList", params);}
    public List<Map<String, Object>> getApproveDocBoxList(Map<String, Object> params) { return selectList("approvalUser.getApproveDocBoxList", params);}

    /** 결재설정 - 결재선 설정 */
    public void setUserFavApproveRoute(Map<String, Object> params){ insert("approvalUser.setUserFavApproveRoute", params);}
    public void setUserFavApproveRouteUpdate(Map<String, Object> params){ update("approvalUser.setUserFavApproveRouteUpdate", params);}
    public void setUserFavApproveRouteActiveN(Map<String, Object> params) { update("approvalUser.setUserFavApproveRouteActiveN", params);}
    public void setUserFavApproveRouteDetail(Map<String, Object> params){ insert("approvalUser.setUserFavApproveRouteDetail", params);}
    public void setUserFavApproveRouteDetailDel(Map<String, Object> params){ delete("approvalUser.setUserFavApproveRouteDetailDel", params);}
    public void setUserFavApproveRouteDetailActiveN(Map<String, Object> params) { update("approvalUser.setUserFavApproveRouteDetailActiveN", params);}
    public List<Map<String, Object>> getUserFavApproveRouteList(Map<String, Object> params){ return selectList("approvalUser.getUserFavApproveRouteList", params);}
    public List<Map<String, Object>> getUserFavApproveRouteDetail(Map<String, Object> params){ return selectList("approvalUser.getUserFavApproveRouteDetail", params);}

    /** 결재설정 - 부재설정 */
    public List<Map<String, Object>> getAbsentSetList(Map<String, Object> params){ return selectList("approvalUser.getAbsentSetList", params);} /** 완료 */
    public String getMaxAiSeqNum(Map<String, Object> params) { return (String) selectOne("approvalUser.getMaxAiSeqNum", params);} /** 완료 */
    public void setAbsentInfo(Map<String, Object> params) { insert("approvalUser.setAbsentInfo", params);}/** 완료 */
    public void setAbsentInfoUpd(Map<String, Object> params) { update("approvalUser.setAbsentInfoUpd", params);}/** 완료 */
    public void setVicariousInfo(Map<String, Object> params) { insert("approvalUser.setVicariousInfo", params);}/** 완료 */
    public void setVicariousInfoUpd(Map<String, Object> params) { update("approvalUser.setVicariousInfoUpd", params); }
    public String getOrgPullPath(Map<String, Object> params) { return (String) selectOne("approvalUser.getOrgPullPath", params); }/** 완료 */
    public Map<String, Object> getAbsentSet(Map<String, Object> params) { return (Map<String, Object>) selectOne("approvalUser.getAbsentSet", params); } /** 수정중 */
    public List<Map<String, Object>> getAbsentDuplicate(Map<String, Object> params) { return selectList("approvalUser.getAbsentDuplicate", params); }/** 완료 */

    /** 부재설정 부재시작, 종료 스케줄러 */
    public void setAbsentStartEndUpd(){
        List<Map<String, Object>> empList = selectList("approvalUser.getAbsentUpdateList");

        update("approvalUser.setAbsentStartUpd", null);
        update("approvalUser.setAbsentEndUpd", null);

        for (Map<String, Object> map : empList) {
            if(map.get("C_AIALIM").equals("1")){
                map.put("recEmpSeq", map.get("empSeq"));
                map.put("ntTitle", "[대결지정] 부재자 : " + map.get("SND_EMP_NM"));
                map.put("ntContent", "대결기간 : " + map.get("ABSENT_DT"));
                map.put("ntUrl", "/approvalUser/absentSet.do");
                insert("common.setAlarm", map);
            }
        }
    }

    /** 결재설절 - 부재설정 끝 */

    public List<Map<String, Object>> getApprovalDocSearchList(Map<String, Object> params) {
        return selectList("approvalUser.getApprovalDocSearchList", params);
    }
    public List<Map<String, Object>> getMainUserDocStorageBoxList(Map<String, Object> params) { return selectList("approvalUser.getMainUserDocStorageBoxList", params);}

    public List<Map<String, Object>> getApproveDocBoxListMobile(Map<String, Object> params) {

        return selectList("approvalUser.getApproveDocBoxListMobile", params);
    }

    public List<Map<String, Object>> getMainUserDocStorageBoxListMobile(Map<String, Object> params) {
        return selectList("approvalUser.getMainUserDocStorageBoxListMobile", params);
    }

    public List<Map<String, Object>> getUserDocStorageBoxListMobile(Map<String, Object> params) {
        return selectList("approvalUser.getUserDocStorageBoxListMobile", params);
    }
}
