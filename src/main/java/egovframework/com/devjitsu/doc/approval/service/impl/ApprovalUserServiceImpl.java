package egovframework.com.devjitsu.doc.approval.service.impl;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import egovframework.com.devjitsu.doc.approval.repository.ApprovalUserRepository;
import egovframework.com.devjitsu.doc.approval.service.ApprovalUserService;
import egovframework.devjitsu.common.utiles.EgovStringUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ApprovalUserServiceImpl implements ApprovalUserService {

    private static final Logger logger = LoggerFactory.getLogger(ApprovalUserServiceImpl.class);

    @Autowired
    private ApprovalUserRepository approvalUserRepository;

    @Override
    public String getDraftFormList(Map<String, Object> params) {
        List<Map<String, Object>> getDocFormList = approvalUserRepository.getDraftFormList();

        List<Map<String, Object>> treeList = new ArrayList<>();

        for (Map<String, Object> map : getDocFormList) {
            if(map.get("UPPER_FOLDER_ID").equals("0") || map.get("UPPER_FOLDER_ID").equals("999")){
                map.put("expanded", true);
            }
        }

        //양식 폴더
        for (Map<String, Object> docFormFolder : getDocFormList) {
            //양식 목록
            for (Map<String, Object> docForm : getDocFormList) {
                if(docFormFolder.get("FORM_FOLDER_ID").equals(docForm.get("UPPER_FOLDER_ID"))){
                    List<Map<String, Object>> docFormList = new ArrayList<Map<String, Object>>();
                    if(docFormFolder.containsKey("items")){
                        docFormList = (List<Map<String, Object>>) docFormFolder.get("items");
                        docFormList.add(docForm);
                        docFormFolder.put("items", docFormList);
                    }else{
                        docFormList.add(docForm);
                        docFormFolder.put("items", docFormList);
                    }
                }
            }

            if(docFormFolder.get("FORM_FOLDER_ID").equals("999")){
                treeList.add(docFormFolder);
            }
        }

        return new Gson().toJson(treeList);
    }

    @Override
    public List<Map<String, Object>> getUserDocStorageBoxList(Map<String, Object> params) {
        return approvalUserRepository.getUserDocStorageBoxList(params);
    }

    @Override
    public List<Map<String, Object>> getUserReadDocStorageBoxList(Map<String, Object> params) {
        StringBuilder deptPathQuery = new StringBuilder();
        deptPathQuery = getDeptPathQuery(params);
        params.put("deptPathQuery", deptPathQuery.toString());
        return approvalUserRepository.getUserReadDocStorageBoxList(params);
    }

    @Override
    public void setCheckedDocDel(Map<String, Object> params) {
        Gson gson = new Gson();
        List<Map<String, Object>> docIdList = gson.fromJson((String) params.get("docArr"), new TypeToken<List<Map<String, Object>>>() {}.getType());
        approvalUserRepository.setCheckedDocDel(docIdList);
    }

    @Override
    public void setDocDel(Map<String, Object> params) {
        approvalUserRepository.setDocDel(params);
    }

    @Override
    public List<Map<String, Object>> getApproveDocBoxList(Map<String, Object> params) {
        StringBuilder absentUserQuery = new StringBuilder();
        absentUserQuery = getAbsentUserQuery(params);
        params.put("absentUserQuery", absentUserQuery.toString());

        return approvalUserRepository.getApproveDocBoxList(params);
    }

    @Override
    public List<Map<String, Object>> getUserFavApproveRouteList(Map<String, Object> params) {
        return approvalUserRepository.getUserFavApproveRouteList(params);
    }

    @Override
    @Transactional
    public Map<String, Object> setUserFavApproveRoute(Map<String, Object> params) {
        Map<String, Object> result = new HashMap<>();

        Gson gson = new Gson();
        List<Map<String, Object>> favApproveRoute = gson.fromJson((String) params.get("favApproveRoute"), new TypeToken<List<Map<String, Object>>>() {}.getType());

        try {
            if(StringUtils.isEmpty(params.get("favRouteId"))){
                approvalUserRepository.setUserFavApproveRoute(params);
                for(Map<String, Object> favApproveRouteDetail : favApproveRoute){
                    favApproveRouteDetail.put("favRouteId", params.get("FAV_ROUTE_ID"));
                    approvalUserRepository.setUserFavApproveRouteDetail(favApproveRouteDetail);
                }
            }else{
                approvalUserRepository.setUserFavApproveRouteUpdate(params);
                approvalUserRepository.setUserFavApproveRouteDetailDel(params);

                for(Map<String, Object> favApproveRouteDetail : favApproveRoute){
                    approvalUserRepository.setUserFavApproveRouteDetail(favApproveRouteDetail);
                }
            }

            result.put("code", "200");
            result.put("message", "결재선 저장이 완료되었습니다.");
        } catch (Exception e) {
            result.put("code", "500");
            result.put("message", "결재선 저장 중 에러가 발생했습니다.");
        }

        return result;
    }

    @Override
    @Transactional
    public Map<String, Object> setUserFavApproveRouteActiveN(Map<String, Object> params) {
        Map<String, Object> result = new HashMap<>();

        try {
            approvalUserRepository.setUserFavApproveRouteActiveN(params);
            approvalUserRepository.setUserFavApproveRouteDetailActiveN(params);

            result.put("code", "200");
            result.put("message", "결재선 삭제가 완료되었습니다.");
        } catch (Exception e) {
            result.put("code", "500");
            result.put("message", "결재선 삭제 중 에러가 발생했습니다.");
        }

        return result;
    }

    @Override
    public List<Map<String, Object>> getUserFavApproveRouteDetail(Map<String, Object> params) {
        return approvalUserRepository.getUserFavApproveRouteDetail(params);
    }

    @Override
    public List<Map<String, Object>> getAbsentSetList(Map<String, Object> params) {
        return approvalUserRepository.getAbsentSetList(params);
    }

    @Override
    public Map<String, Object> getAbsentDuplicate(Map<String, Object> params) {
        Map<String, Object> map = new HashMap<>();
        int cnt = 0;
        List<Map<String, Object>> list = new ArrayList<>();
        String orgPullPath = null;
        orgPullPath = approvalUserRepository.getOrgPullPath(params);
        list = approvalUserRepository.getAbsentDuplicate(params);
        cnt = list.size();
        map.put("dupleList", list);
        map.put("cnt", Integer.valueOf(cnt));
        map.put("pathName", orgPullPath);

        return map;
    }

    @Override
    public void setAbsentInfo(Map<String, Object> params) {
        int cnt = 0;
        String aiSeqNum = approvalUserRepository.getMaxAiSeqNum(params);

        params.put("c_aiseqnum", aiSeqNum);

        if (EgovStringUtil.isNullToString(params.get("c_aistatus")).equals("")){
            params.put("c_aistatus", null);
        }

        approvalUserRepository.setAbsentInfo(params);
        approvalUserRepository.setVicariousInfo(params);
    }

    @Override
    public int setAbsentInfoUpd(Map<String, Object> params) {
        int cnt = 0;
        if (EgovStringUtil.isNullToString(params.get("c_aistatus")).equals("")){
            params.put("c_aistatus", null);
        }

        String oriAbsenceSeq = EgovStringUtil.isNullToString(params.get("oriAbsenceSeq"));
        String uiUserkey = EgovStringUtil.isNullToString(params.get("c_uiuserkey"));
        String oriDeptSeq = EgovStringUtil.isNullToString(params.get("oriDeptSeq"));
        String oiOrgcode = EgovStringUtil.isNullToString(params.get("c_oiorgcode"));
        if (!oriAbsenceSeq.equals(uiUserkey) || !oriDeptSeq.equals(oiOrgcode)) {
            Map<String, Object> newMap = new HashMap<>();
            newMap.put("loginVO", params.get("loginVO"));
            newMap.put("c_aistatus", "d");
            newMap.put("c_uiuserkey", oriAbsenceSeq);
            newMap.put("c_oiorgcode", oriDeptSeq);
            newMap.put("c_aiseqnum", params.get("c_aiseqnum"));
            approvalUserRepository.setAbsentInfoUpd(newMap);
            String aiSeqNum = approvalUserRepository.getMaxAiSeqNum(params);
            params.put("c_aiseqnum", aiSeqNum);
            if (EgovStringUtil.isNullToString(params.get("c_aistatus")).equals("")) {
                params.put("c_aistatus", null);
            }
            approvalUserRepository.setAbsentInfo(params);
            approvalUserRepository.setVicariousInfo(params);
            cnt++;

        } else {
            String oriAbsenceSeqArr = EgovStringUtil.isNullToString(params.get("oriAbsenceSeq"));
            String uiUserkeyArr = EgovStringUtil.isNullToString(params.get("c_uiuserkey"));
            String oriDeptSeqArr = EgovStringUtil.isNullToString(params.get("oriDeptSeq"));
            String aiSeqnumArr = EgovStringUtil.isNullToString(params.get("c_aiseqnum"));
            for (int i = 0; i < (uiUserkeyArr.split("\\|")).length; i++) {
                oriAbsenceSeq = oriAbsenceSeqArr.split("\\|")[i];
                oriDeptSeq = oriDeptSeqArr.split("\\|")[i];
                String aiSeqnum = aiSeqnumArr.split("\\|")[i];
                params.put("c_uiuserkey", oriAbsenceSeq);
                params.put("c_oiorgcode", oriDeptSeq);
                params.put("c_aiseqnum", aiSeqnum);
                approvalUserRepository.setAbsentInfoUpd(params);
            }
            if (!EgovStringUtil.isNullToString(params.get("c_aistatus")).equals("d")){
                approvalUserRepository.setVicariousInfoUpd(params);
            }
        }

        return cnt;
    }

    @Override
    public List<Map<String, Object>> getApprovalDocSearchList(Map<String, Object> params) {
        StringBuilder deptPathQuery = new StringBuilder();
        deptPathQuery = getDeptPathQuery(params);
        params.put("deptPathQuery", deptPathQuery.toString());
        return approvalUserRepository.getApprovalDocSearchList(params);
    }

    /** 대결자 추출 */
    private StringBuilder getAbsentUserQuery(Map<String, Object> paramMap) {
        String np307 = "";
        try {
        } catch (Exception e1) {
            e1.printStackTrace();
        }
        paramMap.put("np307", np307);
        StringBuilder absentUserQuery = new StringBuilder();
        absentUserQuery.append("\n SELECT '" + paramMap.get("empSeq") + "' AS C_UIUSERKEY , '" + paramMap.get("deptSeq") + "' AS C_OIORGCODE FROM DUAL");
        if (np307.equals("2")) {
            List<Map<String, Object>> empDeptList = approvalUserRepository.getEmpDeptList(paramMap);
            for (int j = 0; j < empDeptList.size(); j++) {
                absentUserQuery.append("\n UNION ALL");
                absentUserQuery.append("\n SELECT  '" + ((Map)empDeptList.get(j)).get("EMP_SEQ") + "' AS C_UIUSERKEY , '" + ((Map)empDeptList.get(j)).get("DEPT_SEQ") + "' AS C_OIORGCODE FROM DUAL");
            }
        }
        //TODO.. 대결자 임시 주석처리
        List<Map<String, Object>> absentUserList = approvalUserRepository.getAbsentUserList(paramMap);
        for (int i = 0; i < absentUserList.size(); i++) {
            absentUserQuery.append("\n UNION ALL");
            absentUserQuery.append("\n SELECT  '" + ((Map)absentUserList.get(i)).get("C_UIUSERKEY") + "' AS C_UIUSERKEY , '" + ((Map)absentUserList.get(i)).get("C_OIORGCODE") + "' AS C_OIORGCODE FROM DUAL");
        }
        return absentUserQuery;
    }

    /** 열람자 부서 추출 */
    private StringBuilder getDeptPathQuery(Map<String, Object> params) {
        List<Map<String, Object>> list = approvalUserRepository.getDeptPathList(params);
        StringBuilder deptPathQuery = new StringBuilder();
        deptPathQuery.append("\n SELECT  'u' AS GBN_ORG , '" + params.get("groupSeq") + "' AS GROUP_SEQ, '" + params.get("compSeq") +
                "' AS COMP_SEQ, '" + params.get("deptSeq") + "' AS DEPT_SEQ, '" + params.get("empSeq") + "' AS EMP_SEQ   FROM DUAL");
        for (int i = 0; i < list.size(); i++) {
            deptPathQuery.append("\n UNION ALL");
            deptPathQuery.append("\n SELECT  '" + ((Map)list.get(i)).get("GBN_ORG") + "' AS GBN_ORG , '" + ((Map)list.get(i)).get("GROUP_SEQ") +
                    "' AS GROUP_SEQ, '" + ((Map)list.get(i)).get("COMP_SEQ") + "' AS COMP_SEQ, '" + ((Map)list.get(i)).get("DEPT_SEQ") +
                    "' AS DEPT_SEQ, '" + ((Map)list.get(i)).get("EMP_SEQ") + "' AS EMP_SEQ   FROM DUAL");
        }

        return deptPathQuery;
    }

    /**대시보드 상신 문서 조회*/
    @Override
    public List<Map<String, Object>> getMainUserDocStorageBoxList(Map<String, Object> params) {
        return approvalUserRepository.getMainUserDocStorageBoxList(params);
    }

    @Override
    public List<Map<String, Object>> getApproveDocBoxListMobile(Map<String, Object> params) {
        StringBuilder absentUserQuery = new StringBuilder();
        absentUserQuery = getAbsentUserQuery(params);
        params.put("absentUserQuery", absentUserQuery.toString());

        return approvalUserRepository.getApproveDocBoxListMobile(params);
    }

    @Override
    public List<Map<String, Object>> getMainUserDocStorageBoxListMobile(Map<String, Object> params) {
        return approvalUserRepository.getMainUserDocStorageBoxListMobile(params);
    }

    @Override
    public List<Map<String, Object>> getUserDocStorageBoxListMobile(Map<String, Object> params) {
        return approvalUserRepository.getUserDocStorageBoxListMobile(params);
    }
}
