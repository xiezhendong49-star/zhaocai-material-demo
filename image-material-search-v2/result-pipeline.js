(function enhanceMaterialResultPipeline() {
  const pipeline = {
    sawRecognitionLoading: false,
    integrationTimer: null,
  };

  const isMaterialListFlow = () =>
    typeof state !== 'undefined' && state.uploadIntent === 'materials' && state.hasImage;

  function showPipelineLoading(phase) {
    if (!isMaterialListFlow()) return;
    clearTimeout(state.resultTimer);

    const status = document.querySelector('#resultsStatus');
    if (status) {
      status.textContent = phase === 'integrating'
        ? '正在整合搜索结果…'
        : '正在识别并拆分图片…';
    }

    if (typeof renderSkeleton === 'function') renderSkeleton();
  }

  const originalShowSearch = showSearch;
  showSearch = function showSearchWithPipeline(options) {
    clearTimeout(pipeline.integrationTimer);
    pipeline.integrationTimer = null;
    const willRecognize = isMaterialListFlow() && (!options || options.status === undefined || options.status === 'loading');
    pipeline.sawRecognitionLoading = willRecognize;
    const result = originalShowSearch.apply(this, arguments);
    if (willRecognize) showPipelineLoading('recognizing');
    return result;
  };

  const originalRenderResults = renderResults;
  renderResults = function renderResultsWithPipeline(delay) {
    if (isMaterialListFlow() && state.recognitionStatus === 'loading') {
      pipeline.sawRecognitionLoading = true;
      showPipelineLoading('recognizing');
      return;
    }
    if (isMaterialListFlow() && pipeline.integrationTimer) {
      showPipelineLoading('integrating');
      return;
    }
    return originalRenderResults.apply(this, arguments);
  };

  const originalRenderObjectTabs = renderObjectTabs;
  renderObjectTabs = function renderObjectTabsWithPipeline() {
    const result = originalRenderObjectTabs.apply(this, arguments);

    if (!isMaterialListFlow()) return result;
    if (state.recognitionStatus === 'loading') {
      pipeline.sawRecognitionLoading = true;
      showPipelineLoading('recognizing');
      return result;
    }

    if (pipeline.sawRecognitionLoading && !pipeline.integrationTimer) {
      pipeline.sawRecognitionLoading = false;
      showPipelineLoading('integrating');
      pipeline.integrationTimer = setTimeout(() => {
        pipeline.integrationTimer = null;
        if (isMaterialListFlow() && state.recognitionStatus !== 'loading') {
          originalRenderResults(0);
        }
      }, 1000);
    }
    return result;
  };

  if (isMaterialListFlow() && state.recognitionStatus === 'loading') {
    pipeline.sawRecognitionLoading = true;
    showPipelineLoading('recognizing');
  }
})();
