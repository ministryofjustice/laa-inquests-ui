import sinon from "sinon";
import axios from "axios";
import { assert } from "chai";
import { ApplicationDataStoreAdaptor } from '#src/adaptors/dataStoreApplicationAdaptor.js';

const axiosGetStub = sinon.stub(axios, "get");

afterEach(() => {
  axiosGetStub.reset();
});

describe('Test Application API Adaptor', () => {
  it('Test get Applications calls axios', async () => {
    const baseUrl = "https://www.gov.uk";
    const fakeAxios = { get: axiosGetStub } as any;
    const adaptor = new ApplicationDataStoreAdaptor(fakeAxios, baseUrl);
    axiosGetStub.resolves({
      data: {},
    });
    await adaptor.getApplication("123");
    assert(axiosGetStub.calledOnce);
    sinon.assert.calledWith(axiosGetStub, baseUrl);
  });
});

