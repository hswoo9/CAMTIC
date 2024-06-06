package egovframework.com.devjitsu.cam_manager.service.impl;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import egovframework.com.devjitsu.cam_manager.repository.SetManagementRepository;
import egovframework.com.devjitsu.cam_manager.service.SetManagementService;
import egovframework.com.devjitsu.cam_project.repository.ProjectRndRepository;
import egovframework.com.devjitsu.cam_project.service.impl.ProjectRndServiceImpl;
import egovframework.com.devjitsu.g20.repository.G20Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@Service
public class SetManagementServiceImpl implements SetManagementService {

    @Autowired
    private SetManagementRepository setManagementRepository;

    @Autowired
    private ProjectRndRepository projectRndRepository;

    @Autowired
    private G20Repository g20Repository;

    @Override
    public void setProject(Map<String, Object> params) {
        if(params.containsKey("corpPjtSn")){
            setManagementRepository.updCorpProject(params);
        } else {
            setManagementRepository.insCorpProject(params);
        }

        params.put("pjtSn", params.get("corpPjtSn").toString());
        if(params.get("sbjSep").toString().equals("Y")){
            Gson gson = new Gson();
            List<Map<String, Object>> ACCOUNT_LIST = new ArrayList<>();
            ACCOUNT_LIST = gson.fromJson((String) params.get("accountList"), new TypeToken<List<Map<String, Object>>>(){}.getType());
            params.put("accountList", ACCOUNT_LIST);
            projectRndRepository.insAccountInfo(params);
        }
    }

    @Override
    public List<Map<String, Object>> getCorpProjectList(Map<String, Object> params) {
        return setManagementRepository.getCorpProjectList(params);
    }

    @Override
    public List<Map<String, Object>> getCorpProjectListMng(Map<String, Object> params) {
        return setManagementRepository.getCorpProjectListMng(params);
    }

    @Override
    public Map<String, Object> getCorpProjectData(Map<String, Object> params) {
        return setManagementRepository.getCorpProjectData(params);
    }

    @Override
    public void setRequest(Map<String, Object> params) {
        setManagementRepository.setRequest(params);
    }

    @Override
    public void setApprove(Map<String, Object> params) {
        Map<String, Object> pjtMap = setManagementRepository.getCorpProjectData(params);
        params.put("pjtTmpCd", pjtMap.get("CORP_PJT_CD"));
        params.put("pProjectNM", pjtMap.get("CORP_PJT_NM"));
        params.put("pProjectNMEx", pjtMap.get("CORP_PJT_SUB_NM"));
        params.put("pSDate", pjtMap.get("STR_DT"));
        params.put("pEDate", pjtMap.get("END_DT"));
        params.put("pType", "I");

        /** 사업비 분리 : 테이블 조회해서 데이터 없으면 단일(0)으로 생성, 있으면 for문 */
        params.put("pjtSn", params.get("corpPjtSn").toString());
        List<Map<String, Object>> list = projectRndRepository.getAccountInfo(params);

        int pjtCnt = g20Repository.getProjectCount(params);
        String pjtCd = pjtMap.get("CORP_PJT_CD").toString();
        String cntCode = String.format("%02d", (pjtCnt + 1));

        if(list.size() == 0){
            params.put("pjtCd", pjtCd + cntCode + "0");
            params.put("pProjectCD", params.get("pjtCd"));
            // G20 프로젝트 추가
            g20Repository.insProject(params);
            setManagementRepository.setRequest(params);
        }else{
            for(int i = 0 ; i < list.size() ; i++){
                params.put("pProjectCD", pjtCd + cntCode + list.get(i).get("IS_TYPE"));
                if(i == 0){
                    params.put("pjtCd", params.get("pProjectCD"));
                    setManagementRepository.setRequest(params);
                }
                // G20 프로젝트 추가
                g20Repository.insProject(params);
            }
        }

        // 결재 완료 처리
        setManagementRepository.setApprove(params);
    }

    @Override
    public List<Map<String, Object>> getExnpDeChangeRs(Map<String, Object> params) {
        return setManagementRepository.getExnpDeChangeRs(params);
    }

    @Override
    public void setExnpDeChangeRs(Map<String, Object> params) {
        if(params.containsKey("chngRsSn")){
            setManagementRepository.updExnpDeChangeRs(params);
        } else {
            setManagementRepository.insExnpDeChangeRs(params);
        }
    }

    @Override
    public void delExnpDeChangeRs(Map<String, Object> params) {
        setManagementRepository.delExnpDeChangeRs(params);
    }

    @Override
    public void setRndProjectPrevNextAmt(Map<String, Object> params) {
        if(params.containsKey("govtPjtSn")){
            setManagementRepository.updRndProjectPrevNextAmt(params);
        } else {
            setManagementRepository.setRndProjectPrevNextAmt(params);
        }
    }

    @Override
    public Map<String, Object> getRndProjectPrevNextAmt(Map<String, Object> params) {
        return setManagementRepository.getRndProjectPrevNextAmt(params);
    }

    @Override
    public Map<String, Object> getCorpProjectDataByCd(Map<String, Object> params) {
        return setManagementRepository.getCorpProjectDataByCd(params);
    }
}
