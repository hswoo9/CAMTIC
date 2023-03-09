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

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ApprovalUserServiceImpl implements ApprovalUserService {

    private static final Logger logger = LoggerFactory.getLogger(ApprovalUserServiceImpl.class);

    @Autowired
    private ApprovalUserRepository approvalUserRepository;

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
