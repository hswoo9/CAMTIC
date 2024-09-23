package egovframework.com.devjitsu.docView.service.impl;

import dev_jitsu.MainLib;
import egovframework.com.devjitsu.common.repository.CommonRepository;
import egovframework.com.devjitsu.docView.repository.DocViewRepository;
import egovframework.com.devjitsu.docView.service.DocViewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Service
public class DocViewServiceImpl implements DocViewService {

    @Autowired
    private DocViewRepository docViewRepository;
    @Autowired
    private CommonRepository commonRepository;

    @Override
    public List<Map<String, Object>> getCardLossList(Map<String, Object> params) {
        return docViewRepository.getCardLossList(params);
    }

    @Override
    public List<Map<String, Object>> getCardManager(Map<String, Object> params) {
        return docViewRepository.getCardManager(params);
    }

    @Override
    public void saveCardLoss(Map<String, Object> params) {
        if(params.containsKey("tpClSn")){
            docViewRepository.updateCardLoss(params);
        } else {
            docViewRepository.insertCardLoss(params);
        }
    }

    @Override
    public Map<String, Object> getCardLossData(Map<String, Object> params) {
        return docViewRepository.getCardLossData(params);
    }

    @Override
    public void delCardLossData(Map<String, Object> params) {
        docViewRepository.delCardLossData(params);
    }

    @Override
    public List<Map<String, Object>> getAccCertList(Map<String, Object> params) {
        return docViewRepository.getAccCertList(params);
    }

    @Override
    public void saveAccCert(Map<String, Object> params) {
        if(params.containsKey("accCertSn")){
            docViewRepository.updateAccCert(params);
        } else {
            docViewRepository.insertAccCert(params);
        }
    }

    @Override
    public Map<String, Object> getAccCertData(Map<String, Object> params) {
        return docViewRepository.getAccCertData(params);
    }

    @Override
    public void delAccCertData(Map<String, Object> params) {
        docViewRepository.delAccCertData(params);
    }

    @Override
    public void saveCorpBank(Map<String, Object> params) {
        if(params.containsKey("corpBankSn")){
            docViewRepository.updateCorpBank(params);
        } else {
            docViewRepository.insertCorpBank(params);
        }
    }

    @Override
    public Map<String, Object> getCorpBankData(Map<String, Object> params) {
        return docViewRepository.getCorpBankData(params);
    }

    @Override
    public List<Map<String, Object>> getCorpBankList(Map<String, Object> params) {
        return docViewRepository.getCorpBankList(params);
    }

    @Override
    public void delCorpBank(Map<String, Object> params) {
        docViewRepository.delCorpBank(params);
    }

    @Override
    public void saveCorpCard(Map<String, Object> params) {
        if(params.containsKey("corpCardSn")){
            docViewRepository.updateCorpCard(params);
        } else {
            docViewRepository.insertCorpCard(params);
        }
    }

    @Override
    public Map<String, Object> getCorpCardData(Map<String, Object> params) {
        return docViewRepository.getCorpCardData(params);
    }

    @Override
    public List<Map<String, Object>> getCorpCardList(Map<String, Object> params) {
        return docViewRepository.getCorpCardList(params);
    }

    @Override
    public void delCorpCard(Map<String, Object> params) {
        docViewRepository.delCorpCard(params);
    }

    @Override
    public void saveSignetTo(Map<String, Object> params) {
        if(params.containsKey("signSn")){
            docViewRepository.updateSignetTo(params);
        } else {
            docViewRepository.insertSignetTo(params);
        }

    }

    @Override
    public Map<String, Object> getSignetToData(Map<String, Object> params) {
        return docViewRepository.getSignetToData(params);
    }

    @Override
    public List<Map<String, Object>> getSignetToList(Map<String, Object> params) {
        return docViewRepository.getSignetToList(params);
    }

    @Override
    public void delSignetTo(Map<String, Object> params) {
        docViewRepository.delSignetTo(params);
    }

    @Override
    public void saveDisAsset(Map<String, Object> params) {
        if(params.containsKey("disAssetSn")){
            docViewRepository.updateDisAsset(params);
        } else {
            docViewRepository.insertDisAsset(params);
        }
    }

    @Override
    public Map<String, Object> getDisAssetData(Map<String, Object> params) {
        return docViewRepository.getDisAssetData(params);
    }

    @Override
    public List<Map<String, Object>> getDisAssetList(Map<String, Object> params) {
        return docViewRepository.getDisAssetList(params);
    }

    @Override
    public void delDisAsset(Map<String, Object> params) {
        docViewRepository.delDisAsset(params);
    }

    @Override
    public void saveResign(Map<String, Object> params) {
        if(params.containsKey("resignSn")){
            docViewRepository.updateResign(params);
        } else {
            docViewRepository.insertResign(params);
        }
    }

    @Override
    public Map<String, Object> getResignData(Map<String, Object> params) {
        return docViewRepository.getResignData(params);
    }

    @Override
    public Map<String, Object> getEmpData(Map<String, Object> params) {
        return docViewRepository.getEmpData(params);
    }

    @Override
    public List<Map<String, Object>> getResignList(Map<String, Object> params) {
        return docViewRepository.getResignList(params);
    }

    @Override
    public void delResign(Map<String, Object> params) {
        docViewRepository.delResign(params);
    }

    @Override
    public void saveDetails(Map<String, Object> params) {
        if(params.containsKey("#detSn")){
            docViewRepository.updateDetails(params);
        } else {
            docViewRepository.insertDetails(params);
        }
    }

    @Override
    public Map<String, Object> getDetailsData(Map<String, Object> params) {
        return docViewRepository.getDetailsData(params);
    }

    @Override
    public List<Map<String, Object>> getDetailsList(Map<String, Object> params) {
        return docViewRepository.getDetailsList(params);
    }

    @Override
    public void delDetails(Map<String, Object> params) {
        docViewRepository.delDetails(params);
    }

    @Override
    public void saveCond(Map<String, Object> params) {
        if(params.containsKey("condSn")){
            docViewRepository.updateCond(params);
        } else {
            docViewRepository.insertCond(params);
        }
    }

    @Override
    public Map<String, Object> getCondData(Map<String, Object> params) {
        return docViewRepository.getCondData(params);
    }

    @Override
    public List<Map<String, Object>> getCondList(Map<String, Object> params) {
        return docViewRepository.getCondList(params);
    }

    @Override
    public void delCond(Map<String, Object> params) {
        docViewRepository.delCond(params);
    }

    @Override
    public void saveLeave(Map<String, Object> params, MultipartHttpServletRequest request, String SERVER_DIR, String BASE_DIR) {
        if(params.containsKey("leaveSn")){
            docViewRepository.updateLeave(params);
        } else {
            docViewRepository.insertLeave(params);
        }

        MainLib mainLib = new MainLib();
        Map<String, Object> fileInsMap = new HashMap<>();

        MultipartFile file = request.getFile("file");
        params.put("menuCd", "leaveFile");
        if(file != null){
            if(!file.isEmpty()){
                fileInsMap = mainLib.fileUpload(file, filePath(params, SERVER_DIR));
                fileInsMap.put("leaveSn", params.get("leaveSn"));
                fileInsMap.put("contentId", params.get("leaveSn"));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("filePath", filePath(params, BASE_DIR));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().substring(0, fileInsMap.get("orgFilename").toString().lastIndexOf('.')));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().substring(fileInsMap.get("orgFilename").toString().lastIndexOf('.') + 1));
                fileInsMap.put("empSeq", params.get("empSeq"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("file_no", fileInsMap.get("file_no"));
                docViewRepository.updLeaveFile(fileInsMap);
            }
        }
    }

    @Override
    public Map<String, Object> getLeaveData(Map<String, Object> params) {
        return docViewRepository.getLeaveData(params);
    }

    @Override
    public Map<String, Object> getLeaveFile(Map<String, Object> params) {
        return docViewRepository.getLeaveFile(params);
    }

    @Override
    public List<Map<String, Object>> getLeaveList(Map<String, Object> params) {
        return docViewRepository.getLeaveList(params);
    }

    @Override
    public void delLeave(Map<String, Object> params) {
        docViewRepository.delLeave(params);
    }

    @Override
    public void saveReinstat(Map<String, Object> params, MultipartHttpServletRequest request, String SERVER_DIR, String BASE_DIR) {
        if(params.containsKey("reinstatSn")){
            docViewRepository.updateReinstat(params);
        } else {
            docViewRepository.insertReinstat(params);
        }

        MainLib mainLib = new MainLib();
        Map<String, Object> fileInsMap = new HashMap<>();

        MultipartFile file = request.getFile("file");
        params.put("menuCd", "reinstatFile");
        if(file != null){
            if(!file.isEmpty()){
                fileInsMap = mainLib.fileUpload(file, filePath(params, SERVER_DIR));
                fileInsMap.put("reinstatSn", params.get("reinstatSn"));
                fileInsMap.put("contentId", params.get("reinstatSn"));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("filePath", filePath(params, BASE_DIR));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().substring(0, fileInsMap.get("orgFilename").toString().lastIndexOf('.')));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().substring(fileInsMap.get("orgFilename").toString().lastIndexOf('.') + 1));
                fileInsMap.put("empSeq", params.get("empSeq"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("file_no", fileInsMap.get("file_no"));
                docViewRepository.updReinstatFile(fileInsMap);
            }
        }
    }

    @Override
    public Map<String, Object> getReinstatData(Map<String, Object> params) {
        return docViewRepository.getReinstatData(params);
    }

    @Override
    public Map<String, Object> getReinstatFile(Map<String, Object> params) {
        return docViewRepository.getReinstatFile(params);
    }

    @Override
    public List<Map<String, Object>> getReinstatList(Map<String, Object> params) {
        return docViewRepository.getReinstatList(params);
    }

    @Override
    public void delReinstat(Map<String, Object> params) {
        docViewRepository.delReinstat(params);
    }

    private String filePath (Map<String, Object> params, String base_dir){
        LocalDate now = LocalDate.now();
        DateTimeFormatter fmt = DateTimeFormatter.ofPattern("yyyy/MM/dd");
        String fmtNow = now.format(fmt);

        String path = base_dir + params.get("menuCd").toString()+"/" + fmtNow + "/";

        return path;
    }

    @Override
    public void savePoem(Map<String, Object> params) {
        if(params.containsKey("poemSn")){
            docViewRepository.updatePoem(params);
        } else {
            docViewRepository.insertPoem(params);
        }
    }

    @Override
    public Map<String, Object> getPoemData(Map<String, Object> params) {
        return docViewRepository.getPoemData(params);
    }

    @Override
    public List<Map<String, Object>> getPoemList(Map<String, Object> params) {
        return docViewRepository.getPoemList(params);
    }

    @Override
    public void delPoem(Map<String, Object> params) {
        docViewRepository.delPoem(params);
    }
}
