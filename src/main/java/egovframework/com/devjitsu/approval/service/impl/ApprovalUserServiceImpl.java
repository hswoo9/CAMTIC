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

}
