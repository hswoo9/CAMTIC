package egovframework.com.devjitsu.approval.service.impl;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import egovframework.com.devjitsu.approval.repository.ApprovalUserRepository;
import egovframework.com.devjitsu.approval.service.ApprovalUserService;
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
    public List<Map<String, Object>> getApproveDocBoxList(Map<String, Object> params) {
        StringBuilder absentUserQuery = new StringBuilder();
        //TODO. 대결자 임시 생략
        //absentUserQuery = getAbsentUserQuery(params);
        //params.put("absentUserQuery", absentUserQuery.toString());

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

}
