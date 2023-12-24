package egovframework.com.devjitsu.cam_project.service.impl;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import dev_jitsu.MainLib;
import egovframework.com.devjitsu.cam_crm.repository.CrmRepository;
import egovframework.com.devjitsu.cam_project.repository.ProjectRepository;
import egovframework.com.devjitsu.cam_project.repository.ProjectTeamRepository;
import egovframework.com.devjitsu.cam_project.service.ProjectService;
import egovframework.com.devjitsu.cam_project.service.ProjectTeamService;
import egovframework.com.devjitsu.common.repository.CommonRepository;
import egovframework.com.devjitsu.inside.bustrip.repository.BustripRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class ProjectTeamServiceImpl implements ProjectTeamService {

    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private ProjectTeamRepository projectTeamRepository;
    @Autowired
    private CommonRepository commonRepository;
    @Autowired
    private BustripRepository bustripRepository;
    @Autowired
    private CrmRepository crmRepository;

    @Override
    public List<Map<String, Object>> getTeamVersion(Map<String, Object> params) {
        return projectTeamRepository.getTeamVersion(params);
    }

    @Override
    public List<Map<String, Object>> getTeamList(Map<String, Object> params) {
        return projectTeamRepository.getTeamList(params);
    }

    @Override
    public List<Map<String, Object>> getTeamMngList(Map<String, Object> params) {
        return projectTeamRepository.getTeamMngList(params);
    }

    @Override
    public List<Map<String, Object>> getTeamBudgetList(Map<String, Object> params) {
        return projectTeamRepository.getTeamBudgetList(params);
    }

    @Override
    public Map<String, Object> getVerLeftAmt(Map<String, Object> params) {
        return projectTeamRepository.getVerLeftAmt(params);
    }

    @Override
    public Map<String, Object> getTeamData(Map<String, Object> params) {
        return projectTeamRepository.getTeamData(params);
    }

    @Override
    public void setTeamAddVersion(Map<String, Object> params) {
        if(!params.containsKey("ck")){
            projectTeamRepository.setTeamAddVersion(params);
            /** 최초 버전 저장 후 자가 부서 정보 insert */
            projectTeamRepository.setTeamDelv(params);
        }else{
            /** 이전 버전 정보 불러온 이후에 추가 버전 저장 후 붙혀넣기 */
            List<Map<String, Object>> list = projectTeamRepository.getTeamVersion(params);
            params.put("LAST_TEAM_VERSION_SN", list.get(list.size()-1).get("TEAM_VERSION_SN").toString());
            projectTeamRepository.setTeamAddVersion(params);
            projectTeamRepository.setTeamCopy(params);

            /** 복사 된 팀 정보 불러온 이후에 RND 예산 붙혀넣기*/
            params.put("teamCk", "1");
            List<Map<String, Object>> list2 = projectTeamRepository.getTeamList(params);
            for(Map<String, Object> data : list2){
                params.put("tmSn", data.get("TM_SN"));
                params.put("befTmSn", data.get("BEF_TM_SN"));
                projectTeamRepository.setTeamBudgetCopy(params);
            }
        }
    }

    @Override
    public void updMyTeam(Map<String, Object> params) {
        projectTeamRepository.updMyTeam(params);
    }

    @Override
    public void setTeam(Map<String, Object> params) {
        if(!params.containsKey("tmSn")){
            projectTeamRepository.insTeam(params);
        }else{
            projectTeamRepository.updTeam(params);
        }

        /** 알앤디/비알앤디 예산 설정된 데이터가 있을 시 기존 설정 삭제 후 입력 */
        if(params.containsKey("bgtArr")){
            projectTeamRepository.delTeamBudget(params);
            Gson gson = new Gson();
            List<Map<String, Object>> list = gson.fromJson((String) params.get("bgtArr"), new TypeToken<List<Map<String, Object>>>(){}.getType());
            for(Map<String, Object> data : list){
                data.put("tmSn", params.get("tmSn"));
                data.put("pjtSn", params.get("pjtSn"));
                projectTeamRepository.insTeamBudget(data);
            }
        }
    }

    @Override
    public void delTeam(Map<String, Object> params) {
        projectTeamRepository.delTeam(params);
    }

    @Override
    public void updTeamVersionAppStat(Map<String, Object> params) {
        projectTeamRepository.updTeamVersionAppStat(params);

        if(params.get("stat").toString().equals("100")){
            params.put("teamCk", "1");
            List<Map<String, Object>> list = projectTeamRepository.getTeamList(params);
            for(int i=0; i<list.size(); i++){
                /** WORK_TYPE : I면 insert U면 update*/
                if(list.get(i).get("WORK_TYPE").equals("I")){
                    projectTeamRepository.insTeamProject(list.get(i));
                }else if(list.get(i).get("WORK_TYPE").equals("U")){
                    projectTeamRepository.updTeamProject(list.get(i));
                }else if(list.get(i).get("WORK_TYPE").equals("D")){
                    projectTeamRepository.delTeamProject(list.get(i));
                }
            }
        }
    }

    private String filePath(Map<String, Object> params, String base_dir){
        LocalDate now = LocalDate.now();
        DateTimeFormatter fmt = DateTimeFormatter.ofPattern("yyyy/MM/dd");
        String fmtNow = now.format(fmt);

        String path = base_dir + params.get("menuCd").toString()+"/" + fmtNow + "/";

        return path;
    }
}


