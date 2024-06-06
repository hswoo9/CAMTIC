package egovframework.com.devjitsu.cam_project.service.impl;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import dev_jitsu.MainLib;
import egovframework.com.devjitsu.cam_crm.repository.CrmRepository;
import egovframework.com.devjitsu.cam_project.repository.ProjectRepository;
import egovframework.com.devjitsu.cam_project.repository.ProjectTeamRepository;
import egovframework.com.devjitsu.cam_project.service.ProjectService;
import egovframework.com.devjitsu.cam_project.service.ProjectTeamService;
import egovframework.com.devjitsu.campus.repository.CampusRepository;
import egovframework.com.devjitsu.common.repository.CommonRepository;
import egovframework.com.devjitsu.inside.bustrip.repository.BustripRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
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
    @Autowired
    private CampusRepository campusRepository;

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
    public List<Map<String, Object>> getTeamListAll(Map<String, Object> params) {
        List<Map<String, Object>> teamList = projectTeamRepository.getTeamListAll(params);
        if(teamList.size() > 0){
            for(int i = 0 ; i < teamList.size() ; i++){
                Map<String, Object> serachMap = new HashMap<>();
                serachMap.put("pjtSn", teamList.get(i).get("PJT_SN"));
                serachMap.put("teamVersionSn", teamList.get(i).get("TEAM_VERSION_SN"));
                List<Map<String, Object>> getTeamList = projectTeamRepository.getTeamList(serachMap);
                if(getTeamList.size() > 0){
                    teamList.get(i).put("teamDetailList", getTeamList);
                }
            }
        }
        return teamList;
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
    public Map<String, Object> getLastVerTeamData(Map<String, Object> params) {
        return projectTeamRepository.getLastVerTeamData(params);
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
        /** 최종승인 시 */
        if(params.get("stat").equals("100")){
            /** PM 승인 */
            projectTeamRepository.updPmAppStat(params);
            /** 팀장 승인 */
            projectTeamRepository.updTeamAppStat(params);


            /** 최종승인(모든 PM및 팀장 승인 완료)시 프로젝트 생성 */
            boolean flag = true;
            List<Map<String, Object>> ckList = projectTeamRepository.getTeamList(params);
            for(Map<String, Object> data : ckList){
                String pmCk = data.get("PM_CK").toString();
                String teamCk = data.get("TEAM_CK").toString();

                if(!(pmCk.equals("Y") && teamCk.equals("Y"))){
                    flag = false;
                }
            }

            if(flag){
                projectTeamRepository.updTeamVersionAppStat(params);
                if(params.get("stat").toString().equals("100")){
                    params.put("teamCk", "1");
                    List<Map<String, Object>> teamList = projectTeamRepository.getTeamList(params);
                    for(int i=0; i<teamList.size(); i++){
                        /** WORK_TYPE : I면 insert U면 update*/
                        if(teamList.get(i).get("WORK_TYPE").toString().equals("I")){
                            projectTeamRepository.insTeamProject(teamList.get(i));
                        }else if(teamList.get(i).get("WORK_TYPE").toString().equals("U")){
                            projectTeamRepository.updTeamProject(teamList.get(i));
                        }else if(teamList.get(i).get("WORK_TYPE").toString().equals("D")){
                            projectTeamRepository.delTeamProject(teamList.get(i));
                        }
                    }
                }
            }
        }else{
            projectTeamRepository.updTeamVersionAppStat(params);
        }

        /** 승인함 */
        if(params.get("stat").equals("10")){

            List<Map<String, Object>> list = projectTeamRepository.getTeamList(params);
            for(Map<String, Object> data : list){
                /* TM_TYPE이 0(수주부서)이면 팀장에게만, 협업부서이면 PM, 팀장에게 승인요청 발송 */
                if("0".equals(data.get("TM_TYPE").toString())){
                    params.put("recEmpSeq", "|"+data.get("TEAM_EMP_SEQ").toString()+"|");
                    setPsCheck(params);
                }else{
                    params.put("recEmpSeq", "|"+data.get("PM_EMP_SEQ").toString()+"|");
                    setPsCheck(params);

                    params.put("recEmpSeq", "|"+data.get("TEAM_EMP_SEQ").toString()+"|");
                    setPsCheck(params);
                }
            }

        }

        /** 승인함 승인 */
        if(params.get("stat").equals("100")){
            setPsAppr(params);
        }
    }

    private void setPsCheck(Map<String, Object> params) {
        /** 승인함 */
        params.put("sdEmpSeq", params.get("regEmpSeq"));           // 요청자 사번
        params.put("SND_EMP_NM", params.get("regEmpName"));        // 요청자 성명
        params.put("SND_DEPT_SEQ", params.get("regOrgnztId"));      // 요청자 부서
        params.put("SND_DEPT_NM", params.get("regOrgnztNm"));      // 요청자 부서
        params.put("recEmpSeq", params.get("recEmpSeq"));              // 승인자
        params.put("ntUrl", "/intra/cam_project/teamMng.do");   // url
        params.put("frKey", params.get("teamVersionSn"));
        params.put("psType", "협업승인요청");

        commonRepository.setPsCheck(params);
    }

    private void setPsAppr(Map<String, Object> params) {
        /** 승인함 승인 */
        params.put("type", "협업승인요청");
        params.put("frKey", params.get("teamVersionSn"));
        params.put("targetEmpSeq", params.get("regEmpSeq"));
        campusRepository.updPsStatus(params);
    }

    private String filePath(Map<String, Object> params, String base_dir){
        LocalDate now = LocalDate.now();
        DateTimeFormatter fmt = DateTimeFormatter.ofPattern("yyyy/MM/dd");
        String fmtNow = now.format(fmt);

        String path = base_dir + params.get("menuCd").toString()+"/" + fmtNow + "/";

        return path;
    }
}


