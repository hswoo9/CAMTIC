package egovframework.com.devjitsu.g20.service.impl;

import egovframework.com.devjitsu.cam_manager.repository.CompanyCardRepository;
import egovframework.com.devjitsu.cam_manager.repository.ManageRepository;
import egovframework.com.devjitsu.cam_manager.repository.PayAppRepository;
import egovframework.com.devjitsu.g20.repository.G20Repository;
import egovframework.com.devjitsu.g20.service.G20Service;
import egovframework.com.devjitsu.gw.login.dto.LoginVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.swing.text.AbstractDocument;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class G20ServiceImpl implements G20Service {

    @Autowired
    private G20Repository g20Repository;

    @Autowired
    private ManageRepository manageRepository;

    @Autowired
    private PayAppRepository payAppRepository;

    @Autowired
    private CompanyCardRepository companyCardRepository;

    @Override
    public List<Map<String, Object>> getProjectList(Map<String, Object> params) {
        return g20Repository.getProjectList(params);
    }

    @Override
    public List<Map<String, Object>> getProjectViewList(Map<String, Object> params) {
        return g20Repository.getProjectViewList(params);
    }

    @Override
    public List<Map<String, Object>> getSubjectList(Map<String, Object> params) {
         List<Map<String, Object>> listMap = g20Repository.getCommonGisuInfo(params);

        params.put("gisu", listMap.get(0).get("gisu"));
        params.put("fromDate", listMap.get(0).get("fromDate"));
        params.put("toDate", listMap.get(0).get("toDate"));

        List<Map<String, Object>> payList = payAppRepository.getWaitPaymentList(params);

        params.put("mgtSeq", params.get("mgtSeq") + "|");

//        List<Map<String, Object>> subjectList = g20Repository.getSubjectList(params);

        List<Map<String, Object>> budgetList = g20Repository.getBudgetInfo(params);

        List<Map<String, Object>> result = new ArrayList<>();

        if(params.containsKey("stat")){
            for(Map<String, Object> map : budgetList){

                if(!"0".equals(map.get("DIV_FG"))){

                    int paySum = 0;
                    for (int i=0; i<payList.size(); i++){
                        if(map.get("BGT_CD").toString().equals(payList.get(i).get("BUDGET_SN").toString()) && "N".equals(payList.get(i).get("REVERT_YN").toString())){
                            int payAmount = Integer.parseInt(payList.get(i).get("TOT_COST").toString());

                            // 여입결의서
                            if("2".equals(payList.get(i).get("PAY_APP_TYPE").toString())){
                                payAmount = payAmount * -1;
                            }

                            paySum += payAmount;
//                            paySum += Integer.parseInt(payList.get(i).get("TOT_COST").toString());
                        }
                    }
                    map.put("WAIT_CK", paySum);

                    result.add(map);
                }
            }
        } else {
            for(Map<String, Object> map : budgetList){

                if(!"0".equals(map.get("DIV_FG"))){

                    if(map.get("DIV_FG").equals("3")){
                        String bgt1Cd = map.get("BGT_CD").toString().substring(0, 1);
                        String bgt2Cd = map.get("BGT_CD").toString().substring(0, 3);

                        int paySum = 0;
                        for (int i=0; i<payList.size(); i++){
                            if(map.get("BGT_CD").toString().equals(payList.get(i).get("BUDGET_SN")) && "N".equals(payList.get(i).get("REVERT_YN").toString())){
                                int payAmount = Integer.parseInt(payList.get(i).get("TOT_COST").toString());

                                // 여입결의서
                                if("2".equals(payList.get(i).get("PAY_APP_TYPE").toString())){
                                    payAmount = payAmount * -1;
                                }

                                paySum += payAmount;
//                            paySum += Integer.parseInt(payList.get(i).get("TOT_COST").toString());
                            }
                        }
                        map.put("WAIT_CK", paySum);

                        for(Map<String, Object> subject : budgetList) {
                            if (bgt1Cd.equals(subject.get("BGT_CD"))) {
                                map.put("BGT1_NM", subject.get("BGT_NM"));
                            }

                            if(bgt2Cd.equals(subject.get("BGT_CD"))) {
                                map.put("BGT2_NM", subject.get("BGT_NM"));
                            }
                        }
                        result.add(map);
                    }
                }
            }
        }

        if(params.containsKey("searchValue")){
            String bgtNm = String.valueOf(params.get("searchValue"));

            if (!bgtNm.equals("") && bgtNm != null) {
                Iterator<Map<String, Object>> iterator = result.iterator();
                while (iterator.hasNext()) {
                    Map<String, Object> map = iterator.next();
                    if (!String.valueOf(map.get("BGT_NM")).contains(bgtNm)) {
                        iterator.remove();
                    }
                }
            }
        }

        return result;
    }

    @Override
    public List<Map<String, Object>> getBankList(Map<String, Object> params) {
        return g20Repository.getBankList(params);
    }

    @Override
    public Map<String, Object> getCrmInfo(Map<String, Object> params) {
        return g20Repository.getCrmInfo(params);
    }

    @Override
    public void setCrmInfo(Map<String, Object> params) {
        g20Repository.insCrmInfo(params);
    }

    @Override
    public List<Map<String, Object>> getClientList(Map<String, Object> params) {
        return g20Repository.getClientList(params);
    }

    @Override
    public List<Map<String, Object>> getCardList(Map<String, Object> params) {
        List<Map<String, Object>> listMap = new ArrayList<>();
        if(params.containsKey("cardVal")){
            if(params.get("cardVal").equals("P")){
                listMap = companyCardRepository.getUserCardList(params);
            } else if(params.get("cardVal").equals("M")){
                listMap = companyCardRepository.getCorpCardList(params);
            } else {
                listMap = companyCardRepository.getCardList(params);
            }
        } else {
            if(params.containsKey("g20")){
                listMap = g20Repository.getCardList(params);
            } else {
                listMap = companyCardRepository.getCorpCardList(params);
            }
        }

        return listMap;
    }

    @Override
    public List<Map<String, Object>> getCardAdminList(Map<String, Object> params) {
        List<Map<String, Object>> listMap = companyCardRepository.getCorpCardList(params);

        return listMap;
    }

    @Override
    public List<Map<String, Object>> getOtherList(Map<String, Object> params) {
        return g20Repository.getOtherList(params);
    }

    @Override
    public Map<String, Object> getSempData(Map<String, Object> params) {
        return g20Repository.getSempData(params);
    }

    @Override
    public List<Map<String, Object>> getBudgetList(Map<String, Object> params) {
        return g20Repository.getBudgetList(params);
    }

    @Override
    public List<Map<String, Object>> getCorpProjectList(Map<String, Object> params) {
        return g20Repository.getCorpProjectList(params);
    }

    @Override
    public void setDjCardList(List<Map<String, Object>> list) {
        Map<String, Object> params = new HashMap<>();
        manageRepository.delDjCardList(params);

        manageRepository.insDjCardList(list);
    }

    @Override
    public Map<String, Object> getProjectInfo(Map<String, Object> params) {
        return g20Repository.getProjectInfo(params);
    }

    @Override
    public List<Map<String, Object>> getEtaxList(Map<String, Object> params) {
        return g20Repository.getEtaxList(params);
    }

    @Override
    public Map<String, Object> getEtaxData(Map<String, Object> params) {
        return g20Repository.getEtaxData(params);
    }

    @Override
    public List<Map<String, Object>> getSbankList(Map<String, Object> params) {
        return g20Repository.getSbankList(params);
    }

    @Override
    public void insEtcEmpInfo(Map<String, Object> params) {
        int lastPCd = g20Repository.getLastPCd();

        params.put("pCD", lastPCd + 1);

        System.out.println(params);
        g20Repository.insEtcEmpInfo(params);
    }
}
